import { useState } from "react";
import { authService } from "../../services/AuthService";
import type { AuthFormProps } from "../../types/AuthTypes";

export default function ResetPasswordForm({OnSuccess, OnError}: AuthFormProps) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    var result = await authService.changePassword(oldPassword, newPassword);
    if(result.success){
        OnSuccess();
        return;
    }

    OnError(result.error ?? "Unknown")
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
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => {
              setOldPassword(e.currentTarget.value);
            }}
            required
            className="bg-red-950 focus:bg-red-600 px-5 py-4 text-xl"
          />
        </div>

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

        <div className="flex gap-5">
          <button type="submit" className="bg-red-950 w-full hover:bg-red-600">
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
}
