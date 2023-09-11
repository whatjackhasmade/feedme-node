"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = 3001;
app.get("/meals", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const meals = yield prisma.meal.findMany();
    yield prisma.$disconnect();
    res.send({
        meals,
    });
}));
app.post("/meals", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$connect();
    const title = req.body.title;
    if (!title) {
        res.status(400).send({
            error: "Invalid meal create input",
        });
        return;
    }
    const meal = yield prisma.meal.create({
        data: {
            title: req.body.title,
        },
    });
    yield prisma.$disconnect();
    res.send({
        meal,
    });
}));
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.user.findMany();
    yield prisma.$disconnect();
    res.send({
        users,
    });
}));
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("SERVER IS UP ON PORT:", PORT);
}));
process.on("uncaughtException", (err) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(err);
    yield prisma.$disconnect();
    process.exit(1);
}));
