import { Input } from "./ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"



export const Chatsidebar = () => {
  return <aside className="w-80 bg-white min-h-screen rounded-l-3xl py-2 px-4 relative">
    <Input placeholder="Search rooms and users" type="search" className="bg-[#efefef] mt-2 rounded-xl text-black border-gray-300 placeholder:font-semibold placeholder:text-gray-500" />
    <p className="text-gray-500 font-bold text-sm mt-2 px-2">Rooms</p>
    <div className="px-2 mt-2 h-1/3 overflow-auto">
      <ul className="text-black ">
        <li>Room 1</li>
        <li>Room 2</li>
        <li>Room 3</li>
        <li>Room 4</li>
        <li>Room 5</li>
        <li>Room 6</li>
        <li>Room 7</li>
        <li>Room 8</li>
      </ul>
    </div>
    <p className="text-gray-500 font-bold text-sm mt-2 px-2">Users</p>
    <div className="px-2 mt-2 h-1/3 overflow-auto">
      <ul className="text-black ">
        <li>Room 1</li>
        <li>Room 2</li>
        <li>Room 3</li>
        <li>Room 4</li>
        <li>Room 5</li>
        <li>Room 6</li>
        <li>Room 7</li>
        <li>Room 8</li>
      </ul>
    </div>
    <div className="mt-2 h-[9%] absolute bottom-2 w-11/12 flex items-center justify-between text-black">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 border-2 border-black rounded-full"></div>
        <p className="">Manav Gupta</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <p className="text-xs font-bold">open</p>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

    </div>
  </aside>
}