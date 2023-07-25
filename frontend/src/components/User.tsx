import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const UserCard = () => {
  return (
    <li className="flex items-center gap-4 hover:bg-[#0000000f] py-1 px-2 cursor-pointer rounded-md">
      <Avatar className="w-[38px] h-[38px]">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-semibold text-gray-600 line-clamp-1">
          Manav Gupta
        </p>
        <p className="text-xs text-gray-500 line-clamp-1">Yo wassup</p>
      </div>
    </li>
  );
};
