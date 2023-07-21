import { ChatBox } from "./ChatBox"
import { Chatsidebar } from "./ChatSideBar"

export const Chat = () => {
  return <div className="flex">
    <ChatBox />
    <Chatsidebar />
  </div>
}