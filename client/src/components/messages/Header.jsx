const Header = ({selectedConversation}) => {
    return ( 
        <div className="bg-slate-500 px-4 py-4 flex flex-row">
            <span className="w-7 rounded-full">
              <img src={selectedConversation.profilePic} alt="user avatar" />
            </span>
            <span className="text-gray-900 font-bold mx-2">
              {selectedConversation.fullName}
            </span>
          </div>
     );
}
 
export default Header;