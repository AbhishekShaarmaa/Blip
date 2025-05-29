import LogoutButton from "./LogoutButton";
import HomeButton from "./HomeButton";
import AddFriendButton from "./GlobalUsersButton";
import GroupsButton from "./GroupsButton";
import PendingRequestButton from "./PendingRequestBotton";

export default function Navbar() {
  return (
    <div className="flex flex-col justify-between h-full py-4 px-2 backdrop-filter backdrop-blur-lg bg-opacity-60 border border-gray-800">
      
      {/* top */}
      <div className="flex flex-col gap-4 justify-start">
        {[
          HomeButton,
          PendingRequestButton,
          AddFriendButton,
          GroupsButton,
        ].map((ButtonComponent, index) => (
          <button
            key={index}
            type="button"
            className="hs-tooltip-toggle w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-100 dark:hover:bg-neutral-700"
          >
            <ButtonComponent />
          </button>
        ))}
      </div>

      {/* bottom */}
      <div className="flex justify-center">
        <button
          type="button"
          className="hs-tooltip-toggle w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center text-sm font-semibold border border-transparent text-gray-500 hover:bg-gray-100 dark:hover:bg-neutral-700"
        >
          <LogoutButton />
        </button>
      </div>
    </div>
  );
}
