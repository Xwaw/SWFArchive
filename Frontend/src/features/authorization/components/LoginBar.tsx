import Button from "../../../components/Buttons/Button";
import useLogin from "../hooks/UseLogin";

export const loginBarBackground = "/images/login/login_bar_red.png";

interface LoginBarProps {
  onForgot: () => void;
}

export default function LoginBar({ onForgot }: LoginBarProps) {
  const { isLoading, error, login } = useLogin();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    await login(form);
  };

  if (isLoading) {
    return (
      <div className="w-[60%] h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-1">
          <p
            className="text-[0.55rem] text-[#252525]"
            style={{
              fontFamily: "Pixeled",
              textShadow: "1px 1px 0 rgba(255,255,255,0.5)",
            }}
          >
            LOGGING IN...
          </p>

          <div
            className="
              relative
              w-[150px]
              h-[10px]
              overflow-hidden
              border
              border-[#531010]
              bg-[#1b1b1b]
            "
            style={{
              boxShadow:
                "inset 1px 1px 0 #000, 1px 1px 0 rgba(255,255,255,0.35)",
            }}
          >
            <div className="retro-loading-bar absolute inset-y-0 w-[45px]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-[60%] gap-2"
    >
      <div className="flex flex-col w-[50%] min-w-0">
        <p
          className="p-1 overflow-hidden"
          style={{
            fontFamily: "Pixeled",
            fontSize: 10,
            color: "#252525",
          }}
        >
          E-MAIL / USERNAME
        </p>

        <input
          name="text"
          type="text"
          placeholder="example@yahoo.com"
          className="
            w-full
            min-w-0
            text-black
            border border-black
            bg-white
            rounded-[4px]
            outline-none
            focus:outline-none
            focus:ring-0
          "
        />
      </div>

      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p
            className="p-1 overflow-hidden"
            style={{
              fontFamily: "Pixeled",
              fontSize: 10,
              color: "#252525",
            }}
          >
            PASSWORD
          </p>

          <div
            className="
              text-[0.45rem]
              text-[#b11d1d]
              cursor-pointer
              whitespace-nowrap
              transition-all
              hover:text-[#ff3030]
              hover:[text-shadow:0_0_5px_#ff2020]
            "
            style={{
              fontFamily: "Pixeled",
            }}
            onClick={onForgot}
          >
            Forgot it?
          </div>
        </div>

        <div className="flex w-full min-w-0 items-center">
          <input
            name="password"
            type="password"
            placeholder="********"
            className="
              flex-1
              min-w-0
              text-black
              border border-black
              bg-white
              rounded-[4px]
              outline-none
              focus:outline-none
              focus:ring-0
            "
          />

          <Button
            type="submit"
            style="login"
            width="3.2rem"
            height="1.6rem"
          >
            <p
              className="text-[0.55rem] text-[#f3f598]"
              style={{
                textShadow: "1px 1px 0 #000",
                fontFamily: "Pixeled",
              }}
            >
              LOGIN
            </p>
          </Button>
        </div>

        {error && (
          <p
            className="mt-1 text-[0.45rem] text-[#b00000]"
            style={{ fontFamily: "Pixeled" }}
          >
            {error}
          </p>
        )}
      </div>
    </form>
  );
}