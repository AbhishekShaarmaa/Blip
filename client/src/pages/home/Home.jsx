import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar.jsx";
import MessageContainer from "../../components/messages/MessageContainer";

export default function Home() {
  return (
    <div className="fixed flex h-[90vh] w-[95vw] mb-2 border border-gray-600 rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Navbar />
      <Sidebar />
      <MessageContainer />
    </div>
  );
}
