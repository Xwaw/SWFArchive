import { useState } from "react";
import { authService } from "../../services/AuthService";
import type { AuthFormProps } from "../../types/AuthTypes";

export default function ForgotPasswordForm({OnSuccess, OnError}: AuthFormProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email) {
      await authService.sendEmailWithResetLink(email);
      OnSuccess();
      return;
    }

    OnError("Serwer Error");
  };

  return (
    <div className="w-full h-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 bg-black p-2 justify-center items-center"
      >
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.currentTarget.value);
            }}
            required
            className="bg-red-950 focus:bg-red-600 px-5 py-4 text-xl"
          />
        </div>

        <button type="submit" className="bg-red-950 w-1/2 hover:bg-red-600">
          Send reset link
        </button>
      </form>
    </div>
  );
}
