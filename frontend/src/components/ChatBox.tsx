import { MessageContainer } from "./Message";
import { MessageInput } from "./MessageInput";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import { Separator } from "./ui/separator";

export const ChatBox = () => {
	return (
		<main className="w-[calc(100%-320px)] flex justify-center items-center">
			<div className="max-w-3xl w-full max-h-[450px] h-full bg-[#ededed] mx-2 rounded-3xl relative">
				<div className="rounded-t-3xl py-2 px-4 flex gap-4 items-center bg-white">
					<Avatar className="w-11 h-11">
						<AvatarImage src="https://github.com/shadcn.png" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<div className="text-[#00000097]">
						<p className="font-semibold text-sm line-clamp-1">Shad</p>
						<p className="text-xs line-clamp-1">I build ui component</p>
					</div>
				</div>
				<Separator className="bg-gray-300" />
				<MessageContainer />
				<div className="absolute bottom-0 left-0 w-full">
					<MessageInput />
				</div>
			</div>
		</main>
	);
};
