import { TfiLocationPin } from "react-icons/tfi";

const Footer = () => {
  return (
    <div className="footer flex flex-row justify-between px-4 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 fixed bottom-0">
      <p>&copy; 2024 Blip Messenger, Inc.</p>

      <div className="flex items-center">
        <TfiLocationPin className="mr-1" />
        <p>Jaipur, India</p>
      </div>
    </div>
  );
};

export default Footer;
