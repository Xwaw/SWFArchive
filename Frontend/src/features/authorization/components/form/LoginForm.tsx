import { useState } from "react";
import { authService } from "../../services/AuthService";
import type { AuthFormProps } from "../../types/AuthTypes";

export default function LoginForm({  OnSuccess, OnError }: AuthFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState<boolean>(true);

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await authService.login(username, password, rememberMe);

    if (result.success) {
      OnSuccess();
      return;
    }

    OnError(result.error ?? "Unknown");
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
            value={username}
            onChange={(e) => {
              setUsername(e.currentTarget.value);
            }}
            required
            className="bg-red-950 focus:bg-red-600 px-5 py-4 text-xl"
          />
        </div>
        <div>
          <input
            type={`${showPassword ? "text" : "password"}`}
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.currentTarget.value);
            }}
            required
            className="bg-red-950 focus:bg-red-600 px-5 py-4 text-xl"
          />
        </div>

        <div className="flex gap-4 w-full">
          <div className="w-1/2 flex justify-center gap-1">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.currentTarget.checked)}
            />
            <span>Remember me</span>
          </div>
          <div className="w-1/2 flex justify-center gap-1">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.currentTarget.checked)}
            />
            <span>Show Password?</span>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full justify-center items-center">
          <button type="submit" className="bg-red-950 w-2/3 hover:bg-red-600 flex justify-center items-center">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
