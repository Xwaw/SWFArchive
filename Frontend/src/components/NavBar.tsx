import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/authorization/hooks/UseAuth";
import ProfileButton from "../features/profile/components/ProfileButton";

interface Components{
  children?: React.ReactNode
}
export default function NavBar( {children } : Components) {
  const { isLogged } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="w-screen h-15 bg-gray-400 flex">
      <div className="w-full h-full bg-amber-950 p-2">
        <div
          className="w-40 h-full flex justify-center items-center"
          onClick={() => {
            navigate("/archive");
          }}
        >
          SWFArchive
        </div>
      </div>
      <div className="w-full h-full bg-amber-500 p-2">
          {children}
      </div>

      <div className="w-full h-full bg-amber-950 p-2 flex gap-5 justify-end items-center">
        {isLogged ? (
          <div>
            <ProfileButton />
          </div>
        ) : (
          <div className="flex gap-5 p-2 justify-end items-center bg-blue-500 w-full h-full">
            <div
              className="bg-red-600 w-20 flex justify-center"
              onClick={() => {
                navigate("/auth/register");
              }}
            >
              Register
            </div>
            |
            <div
              className="bg-red-600 w-20 flex justify-center"
              onClick={() => {
                navigate("/auth/login");
              }}
            >
              Login
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
