import { useNavigate } from "react-router-dom";
import NavBar from "../../oldComponents/NavBar";
import Console from "../../features/admin/console/components/Console";

export default function AdminPanel() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-black flex">
      <div className="w-full h-full flex flex-col">
        <div>
          <NavBar></NavBar>
        </div>
        <div className="w-full h-full">
            <Console></Console>
        </div>
      </div>

      <div className="w-70 h-full bg-[#2e0000]">
        <div
          className="w-full h-10 flex justify-center items-center bg-[#333333]"
          onClick={() => {
            navigate("/archive");
          }}
        >
          <p>Archive</p>
        </div>
      </div>
    </div>
  );
}
