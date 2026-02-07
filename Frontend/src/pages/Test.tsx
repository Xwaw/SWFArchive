
import { useNavigate } from "react-router-dom";
import { http } from "../http";

export default function Test() {
  const navigate = useNavigate();

  

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <button onClick={async () => {
    try {
      const res = await http.post(`/mail/test`, {});
      console.log("OK:", res.data);
    } catch (err) {
      console.error("ERROR:", err);
    }
  }}>EMAIL</button>
    </div>
  );
}
