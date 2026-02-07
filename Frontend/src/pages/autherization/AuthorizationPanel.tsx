import { useNavigate } from "react-router-dom";
import RegisterForm from "../../features/authorization/components/form/RegisterForm";
import LoginForm from "../../features/authorization/components/form/LoginForm";
import ForgotPasswordForm from "../../features/authorization/components/form/ForgotPasswordForm";
import ResetPasswordForm from "../../features/authorization/components/form/ResetPasswordForm";
import authText from "../../assets/auth/auth.text.json";
import ChangePasswordForm from "../../features/authorization/components/form/ChangePasswordForm";
import { useState } from "react";
import type { AuthRoute } from "../../features/authorization/types/AuthTypes";
import RouteSectionHelpButtons from "../../features/authorization/components/RouteSectionHelpButtons";

export default function AuthorizationPanel({mode}: AuthRoute) {
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>();

  const handleAuthForm = () => {
    switch (mode) {
      case "register":
        return (
          <RegisterForm
            OnError={setError}
            OnSuccess={() => navigate("/auth/login")}
          />
        );
      case "login":
        return (
          <LoginForm
            OnError={setError}
            OnSuccess={() => navigate("/archive")}
          />
        );
      case "forgot":
        return (<ForgotPasswordForm 
            OnError={setError}
            OnSuccess={() => navigate("/auth/info")}/>
        );
      case "info":
        return(null);
      case "reset":
        return (
          <ResetPasswordForm
            OnError={setError}
            OnSuccess={() => navigate("/auth/login")}
          />
        );
      case "change":
        return (
          <ChangePasswordForm
            OnError={setError}
            OnSuccess={() => console.log("good")}
          />
        );
      default:
        return (
          <RegisterForm
            OnError={setError}
            OnSuccess={() => navigate("/auth/login")}
          />
        );
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-1/4">
        <div className="text-4xl">{authText[mode ?? "register"].title}</div>
        <div>{authText[mode ?? "register"].description}</div>
      </div>
      <div className="w-1/4 h-full bg-black flex flex-col justify-center items-center">
        <div>{error}</div>
        <div>{handleAuthForm()}</div>
        <RouteSectionHelpButtons mode={mode}></RouteSectionHelpButtons>
      </div>
    </div>
  );
}
