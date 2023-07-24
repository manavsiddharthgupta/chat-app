import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./typeDefs";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import { json } from "body-parser";
import { PrismaClient } from "@prisma/client";
import session from "express-session";
import passport from "passport";
import googlePassportConfig from "./lib/passport";
import authRoute from "./routes/auth";

type User = {
	id?: string;
};

export const prisma = new PrismaClient();

const app = express();
const httpServer = http.createServer(app);

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
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
	});

	await server.start();
	app.use(
		"/graphql",
		cors<cors.CorsRequest>(),
		json(),
		expressMiddleware(server, {
			context: async ({ req }) => ({ token: req.headers.token }),
		})
	);

	app.use(
		session({
			secret: "secretcode",
			resave: true,
			saveUninitialized: true,
			cookie: {
				sameSite: "none",
				secure: true,
				maxAge: 1000 * 60 * 60 * 24 * 7, // One Week
			},
		})
	);

	app.use(passport.initialize());
	app.use(passport.session());

	passport.serializeUser((user: User, done) => {
		console.log(user);
		return done(null, user.id);
	});

	passport.deserializeUser((id: string, done) => {
		// Whatever we return goes to the client and binds to the req.user property
		return done(null, id);
	});

	googlePassportConfig();

	app.use("/auth", authRoute);

	await new Promise<void>((resolve) =>
		httpServer.listen({ port: 4000 }, resolve)
	);
	console.log(`🚀 Server ready at http://localhost:4000/graphql`);
})();
