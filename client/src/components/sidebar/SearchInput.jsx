import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";
import useGetGlobalUsers from "../../hooks/useGetGlobalUsers";

export default function SearchInput() {
  const [search, setSearch] = useState("");
  const { setSelectedConversation, selectFriends } = useConversation();
  const { conversations } = useGetConversations();
  const { allUsers } = useGetGlobalUsers();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast("Search term must be atleast 3 characters long!", {
        icon: "🧐",
      });
    }

    //implement search algo to select conversation
    const conversation = (selectFriends ? conversations : allUsers).find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
      toast("Users found", {
        icon: "✅",
      });
    } else toast.error("No such user found!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-between border border-gray-700 p-2"
    >
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered rounded-full flex-grow"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="submit"
        className="btn btn-circle bg-green-500 text-white ml-4"
      >
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
}
