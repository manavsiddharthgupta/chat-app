import { Input } from "./ui/input";
import { Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { myInfo } from "../lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { UserCard } from "./User";
import { useNavigate } from "react-router";

export const Chatsidebar = () => {
  const [myInfo, setMyInfo] = useState<myInfo>({
    id: "",
    name: "Anonymous",
    email: "",
    avatar:
      "https://fastly.picsum.photos/id/379/536/354.jpg?hmac=I4bs_0ZcfxuA6apwsLHEPAqDxBprHAwMwtdoK8oJCOU",
    exp: 0,
    iat: 0,
  });
  const navigate = useNavigate();
  console.log(myInfo);

  useEffect(() => {
    const jwtToken = document.cookie.split("=")[1];
    if (jwtToken) {
      const decoded: myInfo = jwt_decode(jwtToken);
      setMyInfo(decoded);
    } else {
      navigate("/");
    }
  }, [navigate]);

  return (
    <aside className="w-80 bg-white h-screen rounded-l-3xl py-2 px-4 relative">
      <Input
        placeholder="Search rooms and users"
        type="search"
        className="bg-[#efefef] mt-2 rounded-xl text-black border-gray-300 placeholder:font-semibold placeholder:text-gray-500"
      />
      <p className="text-gray-500 font-bold text-sm mt-2 px-2">Rooms</p>
      <ScrollArea className="px-2 mt-2 h-1/3">
        <ul className="text-black ">
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
        </ul>
      </ScrollArea>
      <Separator className="mb-2 bg-slate-200" />
      <p className="text-gray-500 font-bold text-sm px-2">Users</p>
      <ScrollArea className="px-2 mt-2 h-1/3">
        <ul className="text-black ">
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
        </ul>
      </ScrollArea>
      <Separator className="mb-2 bg-slate-200" />
      <div className="py-2 absolute bottom-2 w-11/12 flex items-center justify-between px-2 hover:bg-[#0000000f] rounded-lg cursor-pointer bg-white">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={myInfo.avatar} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="font-semibold text-gray-600">{myInfo.name}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Settings size={18} color="#474747" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="text-black bg-white">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
};
