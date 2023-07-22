"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const typeDefs_1 = require("./typeDefs");
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
(async function () {
    const resolvers = {
        Mutation: {
            createUser: async (_parent, args) => {
                return await exports.prisma.user.create({
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
                return await exports.prisma.user.findMany();
            },
        },
    };
    const server = new server_1.ApolloServer({
        typeDefs: typeDefs_1.typeDefs,
        resolvers,
    });
    const { url } = await (0, standalone_1.startStandaloneServer)(server, {
        listen: { port: 4000 },
    });
    console.log(`🚀 Server listening at: ${url}`);
})();
//# sourceMappingURL=index.js.map