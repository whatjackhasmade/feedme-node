import { NextApiRequest, NextApiResponse } from "next";
import { getPrismaClient } from "@/clients/prisma";

const prisma = getPrismaClient();

export const revalidate = true;

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { body, method } = req;
	const { id } = body;

	switch (method) {
		case "DELETE": {
			if (!id) {
				res.status(400).json({ error: "Missing id" });
			}

			const meal = await prisma.meal.delete({
				where: {
					id: Number(id),
				},
			});

			res.json(meal);

			break;
		}
		case "GET": {
			if (id) {
				const meal = await prisma.meal.findUnique({
					where: {
						id: Number(id),
					},
				});

				res.json(meal);
			}

			const meals = await prisma.meal.findMany();

			res.json({
				meals,
			});

			break;
		}
		case "POST": {
			if (req.body) {
				const meal = await prisma.meal.create({
					data: req.body,
				});

				res.json(meal);
			}

			break;
		}
		case "PUT": {
			const { id, ...data } = body;

			if (!id) {
				res.status(400).json({ error: "Missing id" });
			}

			const meal = await prisma.meal.update({
				where: {
					id: Number(id),
				},
				data,
			});

			res.json(meal);

			break;
		}
	}
}
