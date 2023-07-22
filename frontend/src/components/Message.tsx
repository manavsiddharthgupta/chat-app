import { CheckCheck } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
export const MessageContainer = () => {
	return (
		<ScrollArea className="h-[calc(100%-110px)] px-4">
			<MyMessage />
			<SenderMessage />
			<MyMessage />
			<MyMessage />
			<SenderMessage />
			<SenderMessage />
			<SenderMessage />
			<MyMessage />
			<MyMessage />
			<SenderMessage />
			<MyMessage />
			<MyMessage />
			<SenderMessage />
			<SenderMessage />
			<SenderMessage />
			<MyMessage />
		</ScrollArea>
	);
};

export const SenderMessage = () => {
	return (
		<Card className="bg-white h-fit max-w-xs w-full mb-1">
			<CardContent className="px-2 py-1">
				<p className="text-xs text-black">
					OMG 😲 do you remember what you did last night at the work night out?
				</p>
				<div className="flex justify-end items-center gap-1">
					<p className="text-[0.5rem] text-gray-600">7:18 PM</p>
					{/* <CheckCheck size="10px" className="text-gray-600" /> */}
				</div>
			</CardContent>
		</Card>
	);
};

export const MyMessage = () => {
	return (
		<div className="w-full flex justify-end">
			<Card className="bg-black h-fit max-w-xs w-full mb-1">
				<CardContent className="px-2 py-1">
					<p className="text-xs">i don't remember anything 😄</p>
					<div className="flex justify-end items-center gap-1">
						<p className="text-[0.5rem] text-gray-300">7:18 PM</p>
						<CheckCheck size="10px" className="text-gray-300" />
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
