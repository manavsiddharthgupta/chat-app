import { Card, CardContent } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { formatTime } from "../lib/utils";
import { Message } from "../lib/types";
export const MessageContainer = ({ messages }: { messages: Message[] }) => {
  console.log(messages);
  return (
    <ScrollArea className="h-[calc(100%-110px)] px-4">
      {messages.map((message: Message) => {
        if (message.sender.email === "manavgupta14032003@gmail.com") {
          return <MyMessage key={message.id} messageBody={message} />;
        }
        return <SenderMessage key={message.id} messageBody={message} />;
      })}
    </ScrollArea>
  );
};

export const SenderMessage = ({ messageBody }: { messageBody: Message }) => {
  const timestamp = parseInt(messageBody.createdAt);
  const date = new Date(timestamp);
  const resultTime = formatTime(date.toISOString());
  return (
    <Card className="bg-white h-fit max-w-xs w-full mb-1">
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

export const MyMessage = ({ messageBody }: { messageBody: Message }) => {
  const timestamp = parseInt(messageBody.createdAt);
  const date = new Date(timestamp);
  const resultTime = formatTime(date.toISOString());
  return (
    <div className="w-full flex justify-end">
      <Card className="bg-black h-fit max-w-xs w-full mb-1">
        <CardContent className="px-2 py-1">
          <p className="text-[0.5rem] text-gray-300">You</p>
          <p className="text-xs">{messageBody.body}</p>
          <div className="flex justify-end items-center gap-1">
            <p className="text-[0.5rem] text-gray-300">{resultTime}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
