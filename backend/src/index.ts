import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { gql } from "graphql-tag";


import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

( async function() {
  const typeDefs = gql`

  type Post {
    id: String
    title: String
    description: String
  }

  type User {
    username: String
    name:     String
  }

  type Query {
    getAllPosts: [Post]
    getAllUsers: [User]
  }

  type Mutation {
    createPost(title: String, description: String): Post
  }
`;

interface CreatePost {
  title: string;
  description: string;
}

const resolvers = {
  Mutation: {
    createPost: async (_parent: any, args: CreatePost) => {
      return await prisma.post.create({
        data: {
          title: args.title,
          description: args.description
        }
      })
    }
  },
  Query: {
    getAllPosts: async () => {
      return await prisma.post.findMany();
    },
    getAllUsers: async () => {
      return await prisma.user.findMany();
    }
  }
}


const server = new ApolloServer({
  typeDefs,
  resolvers
});

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`🚀 Server listening at: ${url}`);
})()