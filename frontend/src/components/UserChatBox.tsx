import { MessageContainer } from "./Message";
import { gql, useQuery } from "@apollo/client";
import { Separator } from "./ui/separator";
import { ChatHeader } from "./ChatHeader";
import { UserCardLoading } from "./SideBarLoading";
import { MessageLoading } from "./MessageLoading";
import { UserMessageInput } from "./UserMessageInput";
import { useEffect } from "react";

export const UserChatBox = ({
  userId,
  email,
  myId,
}: {
  userId: string;
  email: string;
  myId: string;
}) => {
  const GET_USERDATA = gql`
    query GetUserData($friendId: String!, $myId: String!) {
      getUserData(friendId: $friendId, myId: $myId) {
        name
        id
        email
        avatar
        messages {
          id
          createdAt
          body
          sender {
            name
            id
            email
          }
        }
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
    data: userData,
    subscribeToMore,
  } = useQuery(GET_USERDATA, {
    variables: { friendId: userId, myId: myId },
  });

  console.log(userData);

  useEffect(() => {
    const GET_MESSAGE = gql`
      subscription MessageSentToUser($receiverId: String) {
        messageSentToUser(receiverId: $receiverId) {
          body
          createdAt
          id
          sender {
            id
            name
            email
          }
        }
      }
    `;

    const userSubscription = subscribeToMore({
      document: GET_MESSAGE,
      variables: { receiverId: userId },
      updateQuery: (prev, { subscriptionData }) => {
        console.log(subscriptionData);
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data.messageSentToUser;
        return Object.assign({}, prev, {
          getUserData: {
            ...prev.getUserData,
            messages: [...prev.getUserData.messages, newMessage],
          },
        });
      },
    });
    const mySubscription = subscribeToMore({
      document: GET_MESSAGE,
      variables: { receiverId: myId },
      updateQuery: (prev, { subscriptionData }) => {
        console.log(subscriptionData);
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data.messageSentToUser;
        return Object.assign({}, prev, {
          getUserData: {
            ...prev.getUserData,
            messages: [...prev.getUserData.messages, newMessage],
          },
        });
      },
    });

    return () => {
      userSubscription();
      mySubscription();
    };
  }, [userId]);

  return (
    <main className="w-[calc(100%-320px)] flex justify-center items-center h-screen">
      <div className="max-w-3xl w-full max-h-[450px] h-full bg-[#ededed] mx-2 rounded-3xl relative">
        {loading ? (
          <div className="rounded-t-3xl py-2 px-4 flex gap-4 items-center bg-white">
            <UserCardLoading />
          </div>
        ) : error ? (
          <p className="text-black">Error :</p>
        ) : (
          <ChatHeader
            name={userData?.getUserData.name}
            description={userData?.getUserData.email}
          />
        )}
        <Separator className="bg-gray-300" />
        {loading ? (
          <MessageLoading />
        ) : error ? (
          <p className="text-black">Error :</p>
        ) : (
          <MessageContainer
            messages={userData?.getUserData.messages}
            myEmail={email}
          />
        )}
        <div className="absolute bottom-0 left-0 w-full">
          <UserMessageInput key={userId} myId={myId} friendId={userId} />
        </div>
      </div>
    </main>
  );
};
