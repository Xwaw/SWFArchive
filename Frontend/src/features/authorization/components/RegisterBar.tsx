import Button from "../../../components/Buttons/Button";
import useRegister from "../hooks/UseRegister";

export const registerBarBackground = "/images/login/login_bar_yellow.png";

export default function RegisterBar() {
  const { isLoading, error, register } = useRegister();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    await register(form);
  };

  if (isLoading) {
    return (
      <div className="w-[68%] h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-1">
          <p
            className="text-[0.55rem] text-[#252525]"
            style={{
              fontFamily: "Pixeled",
              textShadow: "1px 1px 0 rgba(255,255,255,0.5)",
            }}
          >
            CREATING ACCOUNT...
          </p>

          <div
            className="
              relative
              w-[170px]
              h-[10px]
              overflow-hidden
              border
              border-[#665300]
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
      className="flex items-center w-[68%] gap-2"
    >
      <div className="flex flex-col w-[28%] min-w-0">
        <p
          className="p-1 overflow-hidden whitespace-nowrap"
          style={{
            fontFamily: "Pixeled",
            fontSize: 10,
            color: "#252525",
          }}
        >
          USERNAME
        </p>

        <input
          name="username"
          type="text"
          placeholder="Xwaw"
          required
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

      <div className="flex flex-col w-[36%] min-w-0">
        <p
          className="p-1 overflow-hidden whitespace-nowrap"
          style={{
            fontFamily: "Pixeled",
            fontSize: 10,
            color: "#252525",
          }}
        >
          E-MAIL
        </p>

        <input
          name="email"
          type="email"
          placeholder="example@yahoo.com"
          required
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
        <p
          className="p-1 overflow-hidden whitespace-nowrap"
          style={{
            fontFamily: "Pixeled",
            fontSize: 10,
            color: "#252525",
          }}
        >
          PASSWORD
        </p>

        <div className="flex w-full min-w-0 items-center">
          <input
            name="password"
            type="password"
            placeholder="********"
            required
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
            width="3.8rem"
            height="1.6rem"
            disabled={isLoading}
          >
            <p
              className="text-[0.45rem] text-[#f3f598]"
              style={{
                textShadow: "1px 1px 0 #000",
                fontFamily: "Pixeled",
              }}
            >
              REGISTER
            </p>
          </Button>
        </div>

        {error && (
          <p
            className="mt-1 text-[0.4rem] text-[#8b0000]"
            style={{ fontFamily: "Pixeled" }}
          >
            {error}
          </p>
        )}
      </div>
    </form>
  );
}