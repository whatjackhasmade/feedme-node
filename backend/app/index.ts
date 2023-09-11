import express, { Application, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app: Application = express();
app.use(express.json());

const PORT: number = 3001;

app.get("/meals", async (req: Request, res: Response) => {
	const meals = await prisma.meal.findMany();

	await prisma.$disconnect();

	res.send({
		meals,
	});
});

app.post("/meals", async (req: Request, res: Response) => {
	await prisma.$connect();

	const title = req.body.title;

	if (!title) {
		res.status(400).send({
			error: "Invalid meal create input",
		});

		return;
	}

	const meal = await prisma.meal.create({
		data: req.body,
	});

	await prisma.$disconnect();

	res.send({
		meal,
	});
});

app.get("/users", async (req: Request, res: Response) => {
	const users = await prisma.user.findMany();

	await prisma.$disconnect();

	res.send({
		users,
	});
});

app.listen(PORT, async () => {
	console.log("SERVER IS UP ON PORT:", PORT);
});

process.on("uncaughtException", async (err) => {
	console.error(err);
	await prisma.$disconnect();
	process.exit(1);
});
