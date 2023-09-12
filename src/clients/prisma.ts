import { PrismaClient } from ".prisma/client";

let client: PrismaClient | null = null;

export const getPrismaClient = () => {
	if (client) return client;

	client = new PrismaClient();
	return client;
};
