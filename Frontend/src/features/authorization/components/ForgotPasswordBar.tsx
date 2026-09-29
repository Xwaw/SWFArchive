import Button from "../../../components/Buttons/Button";

export const forgotPasswordBarBackground =
  "/images/login/login_bar_green.png";

export default function ForgotPasswordBar() {
  return (
    <div className="flex items-center w-[60%] gap-2">
      <div className="flex flex-col flex-1 min-w-0">
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

        <div className="flex w-full min-w-0 items-center">
          <input
            type="email"
            placeholder="example@yahoo.com"
            className="
              flex-1
              min-w-0
              text-black
              border
              border-black
              bg-white
              rounded-[4px]
              outline-none
              focus:outline-none
              focus:ring-0
            "
          />

          <Button
            style="login"
            width="5.5rem"
            height="1.6rem"
          >
            <p
              className="text-[0.45rem] text-[#f3f598] whitespace-nowrap"
              style={{
                textShadow: "1px 1px 0 #000",
                fontFamily: "Pixeled",
              }}
            >
              RESET
            </p>
          </Button>
        </div>
      </div>
    </div>
  );
}