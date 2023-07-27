import { ChatBox } from "./ChatBox";
import { useState } from "react";
import { Chatsidebar } from "./ChatSideBar";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000/graphql/subscription",
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export const Chat = () => {
  const [chat, setChat] = useState<string>();

  console.log(chat);

  const onSelectRoom = (roomId: string) => {
    setChat(roomId);
  };
  return (
    <ApolloProvider client={client}>
      <div className="flex">
        <ChatBox roomId={chat} />
        <Chatsidebar onSelectRoomChat={onSelectRoom} />
      </div>
    </ApolloProvider>
  );
};
