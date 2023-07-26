import { ChatBox } from "./ChatBox";
import { useState } from "react";
import { Chatsidebar } from "./ChatSideBar";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql/",
  cache: new InMemoryCache(),
});

export const Chat = () => {
  const [chat, setChat] = useState<String>();

  const onSelectRoom = (roomId: string) => {
    setChat(roomId);
  };
  return (
    <ApolloProvider client={client}>
      <div className="flex">
        <ChatBox roomId="a448cf91-4009-4442-81a1-2ad8d65fb451" />
        <Chatsidebar onSelectRoomChat={onSelectRoom} />
      </div>
    </ApolloProvider>
  );
};
