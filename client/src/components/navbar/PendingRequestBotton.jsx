import { useDispatch } from "react-redux";
import { FaUserClock } from "react-icons/fa6";
import { setSidebarStatus } from "../../store/viewSlice";

const PendingRequestButton = () => {
  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    // set status to "pending requests"
    dispatch(setSidebarStatus({ sidebar_status: 2 }));
  };

  return (
    <div className="my-auto">
      <FaUserClock
        className="w-6 h-6 text-white cursor-pointer"
        onClick={handleClick}
        title="Pending Requests"
      />
    </div>
  );
};

export default PendingRequestButton;
