import EmojiPicker, {
  EmojiStyle,
  Theme,
  EmojiClickData,
} from "emoji-picker-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { Smile, SendHorizonal } from "lucide-react";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Message } from "../lib/types";

export const UserMessageInput = ({
  myId,
  friendId,
  onSetMessage,
  email,
}: {
  myId: string;
  friendId: string;
  onSetMessage: (message: Message) => void;
  email: string;
}) => {
  const [message, setMessage] = useState("");

  const onInputChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value);
  };
  const onAddEmoji = (emojiData: EmojiClickData, event: MouseEvent) => {
    setMessage((currVal) => currVal + emojiData.emoji);
  };

  const SEND_MESSAGE = gql`
    mutation Mutation(
      $body: String!
      $receiverId: String!
      $senderId: String!
    ) {
      createMessagebyUser(
        body: $body
        receiverId: $receiverId
        senderId: $senderId
      ) {
        id
        createdAt
        body
      }
    }
  `;

  const [sendMessage, { data, loading, error }] = useMutation(SEND_MESSAGE);

  const onSendMessage = () => {
    sendMessage({
      variables: {
        body: message,
        receiverId: friendId,
        senderId: myId,
      },
    });
    setMessage("");
    onSetMessage({
      body: message,
      createdAt: `${Date.now()}`,
      id: `${Date.now()}`,
      sender: {
        name: "You",
        email: email,
        __typename: "User",
      },
      __typename: "Message",
    });
  };

  return (
    <div className="relative">
      <Input
        value={message}
        onChange={onInputChangeHandler}
        placeholder="Type your message here ..."
        type="text"
        className="bg-white text-black pl-10 pr-12 border-gray-300 placeholder:font-semibold placeholder:text-black rounded-b-3xl py-6"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Smile
            color="#474747"
            size="18px"
            className="absolute top-1/2 -translate-y-1/2 cursor-pointer left-3"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="border-none shadow-none"
          side="top"
          sideOffset={10}
        >
          <EmojiPicker
            onEmojiClick={onAddEmoji}
            autoFocusSearch={false}
            theme={Theme.AUTO}
            searchDisabled
            height={280}
            width={250}
            previewConfig={{
              showPreview: false,
            }}
            // searchPlaceHolder="Filter"
            emojiStyle={EmojiStyle.NATIVE}
          />
        </DropdownMenuContent>
      </DropdownMenu>
      <SendHorizonal
        onClick={onSendMessage}
        color="#474747"
        size="20px"
        className="absolute top-1/2 -translate-y-1/2 cursor-pointer right-3"
      />
    </div>
  );
};
