import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./typeDefs";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { PrismaClient } from "@prisma/client";
import session from "express-session";
import passport from "passport";
import googlePassportConfig from "./lib/passport";
import authRoute from "./routes/auth";
import { PubSub } from "graphql-subscriptions";
import { createServer } from "http";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";

type User = {
  id?: string;
};

export const prisma = new PrismaClient();

const app = express();
const httpServer = createServer(app);

app.use(cors());

const pubsub = new PubSub();

(async function () {
  const resolvers = {
    Query: {
      getAllUsers: async () => {
        return await prisma.user.findMany();
      },
      getAllRooms: async () => {
        return await prisma.room.findMany();
      },
    },
    Mutation: {
      createRoom: async (_: any, args: any) => {
        const { name, description } = args;
        return await prisma.room.create({
          data: {
            name,
            description,
          },
        });
      },
      createMessage: async (_: any, args: any) => {
        const { body, roomId, senderId } = args;
        const mesRes = await prisma.message.create({
          data: {
            body,
            senderId,
            roomId,
          },
          select: {
            id: true,
            body: true,
            sender: {
              select: {
                id: true,
                name: true,
              },
            },
            room: {
              select: {
                id: true,
              },
            },
          },
        });
        pubsub.publish(`messageSent ${roomId}`, { messageSent: mesRes });
        return mesRes;
      },
    },
    Subscription: {
      messageSent: {
        subscribe: async (_: any, args: any, context: any) => {
          const { roomId } = args;
          return pubsub.asyncIterator(`messageSent ${roomId}`);
        },
      },
    },
  };

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql/subscription",
  });
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
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

  passport.deserializeUser((user: User, done) => {
    // Whatever we return goes to the client and binds to the req.user property
    return done(null, user);
  });

  googlePassportConfig();

  app.use("/auth", authRoute);

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
})();
