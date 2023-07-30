export const InvalidChat = () => {
  return (
    <main className="w-[calc(100%-320px)] flex justify-center items-center h-screen">
      <div className="max-w-3xl w-full max-h-[450px] h-full bg-white mx-2 rounded-3xl relative flex flex-col justify-center">
        <p className="text-center font-semibold">
          You have not selected any chat to start conversation
        </p>
        <p className="text-center font-semibold">
          Select any user or room to start converstaion :)
        </p>
      </div>
    </main>
  );
};
