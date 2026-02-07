import { useState } from "react";
import { authService } from "../../services/AuthService";
import type { AuthFormProps } from "../../types/AuthTypes";

export default function RegisterForm({ OnSuccess: onSuccess, OnError: onError }: AuthFormProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await authService.register(username, email, password);

    if (result.success) {
      onSuccess();
      return;
    }

    onError(result.error ?? "Unknown");
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 bg-black p-2 items-center justify-center"
      >
        <div>
          <input
            type="text"
            placeholder="Username"
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
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.currentTarget.value);
            }}
            required
            className="bg-red-950 focus:bg-red-600 px-5 py-4 text-xl"
          />
        </div>

        <button type="submit" className="bg-red-950 w-1/2 hover:bg-red-600">
          Register
        </button>
      </form>
    </div>
  );
}
