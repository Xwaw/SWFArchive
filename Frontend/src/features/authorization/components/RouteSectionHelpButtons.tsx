import { useNavigate } from "react-router-dom";
import type { AuthRoute } from "../types/AuthTypes";

function HelpButtons({ mode }: AuthRoute) {
  const navigate = useNavigate();

  switch (mode) {
    case "login":
      return (
        <div className="flex w-full p-2 gap-5 items-center justify-center">
          <div
            className="text-red-950 w-1/3 hover:text-red-600 flex justify-center items-center cursor-pointer"
            onClick={() => navigate("/auth/register")}
          >
            No Account?
          </div>
          <div
            className="text-red-950 w-1/3 hover:text-red-600 flex justify-center items-center cursor-pointer"
            onClick={() => navigate("/auth/forgot")}
          >
            Forgot Password?
          </div>
        </div>
      );
    case "register":
      return (
        <div className="flex w-full p-2 gap-5 items-center justify-center">
          <div
            className="text-red-950 w-1/3 hover:text-red-600 flex justify-center items-cente cursor-pointer"
            onClick={() => navigate("/auth/login")}
          >
            Have Account?
          </div>
          <div
            className="text-red-950 w-1/3 hover:text-red-600 flex justify-center items-center cursor-pointer"
            onClick={() => navigate("/auth/forgot")}
          >
            Forgot Password?
          </div>
        </div>
      );
    case "reset":
      return (
        <div className="flex w-full p-2 gap-5 items-center justify-center">
          <div
            className="text-red-950 w-2/3 hover:text-red-600 flex justify-center items-center cursor-pointer"
            onClick={() => navigate("/auth/login")}
          >
            Did you remember your old Password?
          </div>
        </div>
      );
    case "info":
      return (
        <div className="flex w-full p-2 gap-5 items-center justify-center">
          <div
            className="bg-red-950 w-2/3 hover:bg-red-600 flex justify-center items-cente cursor-pointer"
            onClick={() => navigate("/")}
          >
            Return to Home page.
          </div>
        </div>
      );
    case "forgot":
      return (
        <div className="flex w-full p-2 gap-5 items-center justify-center">
          <div
            className="text-red-950 w-1/3 hover:text-red-600 flex justify-center items-cente cursor-pointer"
            onClick={() => navigate("/auth/login")}
          >
            Go back to Login.
          </div>
        </div>
      );
      
    default:
      return;
  }
}

export default function RouteSectionHelpButtons({ mode }: AuthRoute) {
  return (
    <div className="flex w-full p-2 gap-5">
      <HelpButtons mode={mode} />
    </div>
  );
}
