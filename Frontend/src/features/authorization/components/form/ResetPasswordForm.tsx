import { useState } from "react";
import { authService } from "../../services/AuthService";
import { useSearchParams } from "react-router-dom";
import type { AuthFormProps } from "../../types/AuthTypes";

export default function ResetPasswordForm({OnSuccess, OnError}: AuthFormProps) {
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [searchParams] = useSearchParams()
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(email && token){
      if(newPassword === repeatPassword){
        await authService.resetPassword(email, token, newPassword);
        OnSuccess();
        return
      }

      OnError("incorrect password confirmation")
      return
    }
  };

  return (
    <div className="w-full h-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 bg-black p-2 justify-center items-center"
      >
        <div>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.currentTarget.value);
            }}
            required
            className="bg-red-950 focus:bg-red-600 px-5 py-4 text-xl"
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Repeat Password"
            value={repeatPassword}
            onChange={(e) => {
              setRepeatPassword(e.currentTarget.value);
            }}
            required
            className="bg-red-950 focus:bg-red-600 px-5 py-4 text-xl"
          />
        </div>

        <button type="submit" className="bg-red-950 w-2/3 hover:bg-red-600 flex justify-center items-center">
          Reset Current Password
        </button>
      </form>
    </div>
  );
}
