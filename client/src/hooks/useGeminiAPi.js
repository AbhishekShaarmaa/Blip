import axios from "axios";
import { useState , useEffect } from "react";

const useGeminiApi = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getApiResponse = async () => {
        setLoading(true);
      try {
        const res = await axios.post({
          url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${
            import.meta.env.VITE_GEMINI_PUBLIC_KEY
          }`,
          method: "post",
          data: {
            contents: [{ parts: [{ text: "Explain how AI works" }] }],
          },
        });
        console.log(res);
        setData(res.candidate.content);
        console.log("data", data);
      } catch (error) {
        console.log("error =  ", error.message);
      }
    };
    getApiResponse();
  }, []);
  return {loading, data};
};

export default useGeminiApi;
