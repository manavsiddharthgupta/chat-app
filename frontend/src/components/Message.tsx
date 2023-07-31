import { Card, CardContent } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { formatTime } from "../lib/utils";
import { Message } from "../lib/types";
import { useRef, useEffect } from "react";

export const MessageContainer = ({
  messages,
  myEmail,
}: {
  messages: Message[] | undefined;
  myEmail: string;
}) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      // @ts-ignore
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  console.log(messages);
  return (
    <ScrollArea className="h-[calc(100%-110px)] px-6">
      <div className="my-4">
        {messages?.map((message: Message, index: number) => {
          if (message.sender.email === myEmail) {
            if (index === messages.length - 1) {
              return (
                <MyMessage
                  addRef={messagesEndRef}
                  key={message.id}
                  messageBody={message}
                />
              );
            }
            return <MyMessage key={message.id} messageBody={message} />;
          }
          if (index === messages.length - 1) {
            return (
              <SenderMessage
                addRef={messagesEndRef}
                key={message.id}
                messageBody={message}
              />
            );
          }
          return <SenderMessage key={message.id} messageBody={message} />;
        })}
      </div>
    </ScrollArea>
  );
};

export const SenderMessage = ({
  messageBody,
  addRef,
}: {
  messageBody: Message;
  addRef?: React.RefObject<HTMLInputElement>;
}) => {
  const timestamp = parseInt(messageBody.createdAt);
  const date = new Date(timestamp);
  const resultTime = formatTime(date.toISOString());
  return (
    <Card
      ref={addRef || null}
      className="bg-white h-fit max-w-xs w-fit px-2 mb-2"
    >
      <CardContent className="px-2 py-1">
        <p className="text-[0.5rem] text-gray-600">{messageBody.sender.name}</p>
        <p className="text-xs text-black">{messageBody.body}</p>
        <div className="flex justify-end items-center gap-1">
          <p className="text-[0.5rem] text-gray-600">{resultTime}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export const MyMessage = ({
  addRef,
  messageBody,
}: {
  messageBody: Message;
  addRef?: React.RefObject<HTMLInputElement>;
}) => {
  const timestamp = parseInt(messageBody.createdAt);
  const date = new Date(timestamp);
  const resultTime = formatTime(date.toISOString());
  return (
    <div ref={addRef || null} className="w-full flex justify-end">
      <Card className="bg-black h-fit max-w-xs w-fit px-2 mb-1">
        <CardContent className="px-2 py-1">
          <p className="text-[0.5rem] text-gray-300">You</p>
          <p className="text-xs text-white">{messageBody.body}</p>
          <div className="flex justify-end items-center gap-1">
            <p className="text-[0.5rem] text-gray-300">{resultTime}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
