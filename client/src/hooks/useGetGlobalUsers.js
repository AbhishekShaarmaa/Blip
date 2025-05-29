import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetGlobalUsers = () => {
  const [globalLoading, setGlobalLoading] = useState(false);
  const [globalUsers, setGlobalUsers] = useState([]);

  //fetching conversation data from api
  useEffect(() => {
    const getConversations = async () => {
      setGlobalLoading(true);
      try {
        const res = await fetch("/api/getUsers/getGlobalUsers");

        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        //set data into conversation state
        setGlobalUsers(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setGlobalLoading(false);
      }
    };
    getConversations();
  }, []);

  return { globalLoading, globalUsers };
};

export default useGetGlobalUsers;
