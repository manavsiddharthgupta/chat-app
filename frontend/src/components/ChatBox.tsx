import { MessageContainer } from "./Message";
import { MessageInput } from "./MessageInput";
import { gql, useQuery } from "@apollo/client";
import { Separator } from "./ui/separator";
import { useEffect } from "react";
import { UserCardLoading } from "./SideBarLoading";
import { ChatHeader } from "./ChatHeader";
import { MessageLoading } from "./MessageLoading";

export const ChatBox = ({
  roomId,
  email,
  myId,
}: {
  roomId: string;
  email: string;
  myId: string;
}) => {
  const GET_ROOM = gql`
    query GetRoomData($roomId: String!) {
      getRoomData(roomId: $roomId) {
        name
        messages {
          id
          body
          createdAt
          sender {
            name
            email
          }
        }
        id
        description
      }
    }
  `;

  const {
    loading,
    error,
    data: roomData,
    subscribeToMore,
  } = useQuery(GET_ROOM, {
    variables: { roomId },
  });

  useEffect(() => {
    const GET_MESSAGE = gql`
      subscription Subscription($roomId: String!) {
        messageSent(roomId: $roomId) {
          id
          createdAt
          body
          sender {
            name
            email
          }
        }
      }
    `;

    const subscription = subscribeToMore({
      document: GET_MESSAGE,
      variables: { roomId },
      updateQuery: (prev, { subscriptionData }) => {
        console.log(subscriptionData);
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data.messageSent;
        return Object.assign({}, prev, {
          getRoomData: {
            ...prev.getRoomData,
            messages: [...prev.getRoomData.messages, newMessage],
          },
        });
      },
    });

    return () => {
      subscription();
    };
  }, [roomId]);

  return (
    <main className="w-[calc(100%-320px)] flex justify-center items-center h-screen">
      <div className="max-w-3xl w-full max-h-[450px] h-full bg-[#ededed] mx-2 rounded-3xl relative">
        {loading ? (
          <div className="rounded-t-3xl py-2 px-4 flex gap-4 items-center bg-white">
            <UserCardLoading />
          </div>
        ) : error ? (
          <p className="text-sm rounded-t-3xl text-center font-bold text-red-500 py-4 bg-white">
            Oops something isn't right
          </p>
        ) : (
          <ChatHeader
            name={roomData?.getRoomData.name}
            description={roomData?.getRoomData.description}
          />
        )}
        <Separator className="bg-gray-300" />
        {loading ? (
          <MessageLoading />
        ) : error ? (
          <p className="text-sm text-center font-bold text-red-500 mt-4">
            Oops something isn't right
          </p>
        ) : (
          <MessageContainer
            messages={roomData?.getRoomData.messages}
            myEmail={email}
          />
        )}
        <div className="absolute bottom-0 left-0 w-full">
          <MessageInput key={roomId} myId={myId} roomId={roomId} />
        </div>
      </div>
    </main>
  );
};
