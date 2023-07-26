import { ChatBox } from "./ChatBox";
import { useState } from "react";
import { Chatsidebar } from "./ChatSideBar";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql/",
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
