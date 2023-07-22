import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./typeDefs";

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

(async function () {
	interface CreateUser {
		name: string;
		username: string;
		password: string;
		email: string;
	}

	const resolvers = {
		Mutation: {
			createUser: async (_parent: any, args: CreateUser) => {
				return await prisma.user.create({
					data: {
						email: args.email,
						name: args.name,
						password: args.password,
						username: args.username,
					},
				});
			},
		},
		Query: {
			getAllUsers: async () => {
				return await prisma.user.findMany();
			},
		},
	};

	const server = new ApolloServer({
		typeDefs,
		resolvers,
	});

	const { url } = await startStandaloneServer(server, {
		listen: { port: 4000 },
	});

	console.log(`🚀 Server listening at: ${url}`);
})();
