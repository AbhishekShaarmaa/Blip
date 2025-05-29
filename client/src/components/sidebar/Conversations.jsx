import { useState } from "react";
import Conversation from "./Conversation";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import useGetGlobalUsers from "../../hooks/useGetGlobalUsers";
import { getRandomEmoji } from "../../utils/emojis";
import GroupModal from "./GroupModal"; // Import GroupModal correctly
// import { MdOutlineGroupAdd } from "react-icons/md";

export default function Conversations() {
  // const sidebarStatus = useSelector((state) => state.view.sidebar_status);
  const { selectFriends } = useConversation();
  const { loading, conversations } = useGetConversations();
  const { globalLoading, globalUsers } = useGetGlobalUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className=" flex flex-col overflow-auto no-scrollbar">
      {/* <button
        onClick={openModal}
        className="fixed ml-[30%] mt-[47%] w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors duration-300"
        aria-label="Add"
      >
        <MdOutlineGroupAdd className="w-6 h-6" />
      </button> */}

      {(selectFriends ? globalUsers : conversations)
        .filter((conversation) => conversation !== null)
        .map((conversation, idx) => (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            emoji={getRandomEmoji()}
            lastIdx={idx === conversations.length - 1}
          />
        ))}

      {(loading || globalLoading) && (
        <span className="loading loading-spinner mx-auto"></span>
      )}

      <GroupModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
