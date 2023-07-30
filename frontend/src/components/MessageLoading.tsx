import { Spinner } from "@chakra-ui/react";

export const MessageLoading = () => {
  return (
    <div className="p-6 flex justify-center">
      <Spinner />
    </div>
  );
};
