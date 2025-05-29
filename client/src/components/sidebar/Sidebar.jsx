import { useSelector } from "react-redux";
import Conversations from "./Conversations";
import SearchInput from "./SearchInput";

export default function Sidebar() {
  const sidebarStatus = useSelector((state)=> state.view.sidebar_status);
  console.log(sidebarStatus);
  return (
    <div className="flex flex-col border border-gray-700">
      <SearchInput />
      <Conversations />
    </div>
  );
}
