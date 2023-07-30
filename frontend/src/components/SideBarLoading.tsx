import { Skeleton } from "./ui/skeleton";

export const SideBarLoading = () => {
  let arr = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="space-y-2">
      {arr.map((i) => {
        return <UserCardLoading key={i} />;
      })}
    </div>
  );
};

export const UserCardLoading = () => {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-[38px] w-[38px] rounded-full bg-slate-300" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-[150px] bg-slate-300" />
        <Skeleton className="h-[10px] w-[200px] bg-slate-300" />
      </div>
    </div>
  );
};
