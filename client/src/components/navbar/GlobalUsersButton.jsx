import { useDispatch } from "react-redux";
import { TbWorldSearch } from "react-icons/tb";
import { setSidebarStatus } from "../../store/viewSlice";
// import useConversation from "../../zustand/useConversation";

export default function GlobalUsersButton() {
  // const { selectFriends, setSelectFriends, setSelectedConversation } =
  // useConversation();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // set status to "Global users"
    dispatch(setSidebarStatus({ sidebar_status: 3 }));
    // if (selectFriends) return;
    // setSelectedConversation(null);
    // setSelectFriends();
  };

  return (
    <div className="my-auto">
      <TbWorldSearch
        className="w-6 h-6 text-white cursor-pointer"
        onClick={handleSubmit}
        title="Global Users"
      />
    </div>
  );
}
