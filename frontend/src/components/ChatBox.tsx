import { MessageContainer } from "./Message";
import { MessageInput } from "./MessageInput";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { gql, useQuery, useSubscription } from "@apollo/client";
import { Separator } from "./ui/separator";
import { useEffect } from "react";

export const ChatBox = ({ roomId }: { roomId: string | undefined }) => {
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

  // const { data, loading: subscriptionloading } = useSubscription(GET_MESSAGE, {
  //   variables: { roomId },
  // });

  // console.log(data);

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

    const subscribeToNewMessage = () => {
      subscribeToMore({
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
    };

    subscribeToNewMessage();
  }, [roomId]);

  return (
    <main className="w-[calc(100%-320px)] flex justify-center items-center h-screen">
      <div className="max-w-3xl w-full max-h-[450px] h-full bg-[#ededed] mx-2 rounded-3xl relative">
        <div className="rounded-t-3xl py-2 px-4 flex gap-4 items-center bg-white">
          <Avatar className="w-11 h-11">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-[#00000097]">
            {loading ? (
              <p className="text-black">Loading...</p>
            ) : error ? (
              <p className="text-black">Error :</p>
            ) : (
              <>
                <p className="font-semibold text-sm line-clamp-1">
                  {roomData?.getRoomData.name}
                </p>
                <p className="text-xs line-clamp-1">
                  {roomData?.getRoomData.description}
                </p>
              </>
            )}
          </div>
        </div>
        <Separator className="bg-gray-300" />
        {loading ? (
          <p className="text-black">Loading...</p>
        ) : error ? (
          <p className="text-black">Error :</p>
        ) : (
          <MessageContainer messages={roomData?.getRoomData.messages} />
        )}
        <div className="absolute bottom-0 left-0 w-full">
          <MessageInput />
        </div>
      </div>
    </main>
  );
};
