import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

export default function LogoutButton() {
  const { logout } = useLogout();
  return (
    <div className="pr-2">
      <BiLogOut
        className="w-8 h-8 text-white cursor-pointer"
        onClick={logout}
        title="Logout"
      />
    </div>
  );
}
