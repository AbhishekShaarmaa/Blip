import MessageInput from "./MessageInput";
import useConversation from "../../zustand/useConversation";
import Messages from "./Messages";
import { capitalize } from "lodash";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { TbHexagonLetterB, TbHexagonLetterL, TbHexagonLetterI, TbHexagonLetterP } from "react-icons/tb";
import Header from "./Header";

export default function MessageContainer() {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    //cleanup function
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="flex flex-col w-full">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <Header selectedConversation={selectedConversation} />
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
}

// incase no chat is selected
const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center text-xl text-gray-200 font-semibold flex flex-col items-center gap-10">
        <p>Hello {capitalize(authUser.userName)}!</p>
        <p>Select a chat to start messaging 🫡</p>
        <div className="flex flex-row ">
          <TbHexagonLetterB size={100} />
          <TbHexagonLetterL size={100} />
          <TbHexagonLetterI size={100} />
          <TbHexagonLetterP size={100} />
        </div>
      </div>
    </div>
  );
};
