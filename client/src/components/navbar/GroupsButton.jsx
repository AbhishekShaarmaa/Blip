import { GrGroup } from "react-icons/gr";
import { useDispatch } from "react-redux";
// import useConversation from "../../zustand/useConversation";
import { setSidebarStatus } from "../../store/viewSlice";

export default function GroupsButton() {
  // const { selectFriends, setSelectFriends, setSelectedConversation } =
  //   useConversation();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // set status to "groups"
    dispatch(setSidebarStatus({ sidebar_status: 4 }));
    // if (!selectFriends) return;
    // setSelectedConversation(null);
    // setSelectFriends();
  };

  return (
    <div className="my-auto">
      <GrGroup
        className="w-6 h-6 text-white cursor-pointer"
        onClick={handleSubmit}
        title="Groups"
      />
    </div>
  );
}
