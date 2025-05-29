import { FaHome } from "react-icons/fa";
import { useDispatch } from "react-redux";
import useConversation from "../../zustand/useConversation";
import { setSidebarStatus } from "../../store/viewSlice";

export default function LogoutButton() {
  const dispatch=useDispatch();
  const { setSelectedConversation } = useConversation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSelectedConversation(null);
    dispatch(setSidebarStatus({sidebar_status: 1}));

  };

  return (
    <div>
      <FaHome
        className="h-6 w-8 text-white cursor-pointer"
        onClick={handleSubmit}
        title="Home"
      />
    </div>
  );
}
