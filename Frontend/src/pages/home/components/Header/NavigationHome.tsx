import Button from "../../../../components/Buttons/Button";

interface NagivationHomeProps {
  isLogged: boolean;
}

export default function NavigationHome({isLogged}: NagivationHomeProps) {
  return (
    <div className="w-full h-[35px] flex shrink-0">
      <Button disabled={location.pathname === "/"} navigateOnClick="/" style="main" font="Verdana">
        Home
      </Button>

      <Button navigateOnClick="/archive" style="main" font="Verdana">
        Archive
      </Button>

      <Button
        disabled={!isLogged}
        navigateOnClick="/profile/id"
        style="main"
        font="Verdana"
      >
        Profile
      </Button>

      <Button
        disabled={!isLogged}
        navigateOnClick="/library/id"
        style="main"
        font="Verdana"
      >
        Your Library
      </Button>

      <Button
        navigateOnClick="/myfavorites"
        style="main"
        font="Verdana"
      >
        Hall Of Fame
      </Button>

      <Button navigateOnClick="/page/updates" style="main" font="Verdana">
        Page Updates
      </Button>

      <Button navigateOnClick="/page/qna" style="main" font="Verdana">
        QnA
      </Button>

      <Button navigateOnClick="/page" style="main" font="Verdana">
        About
      </Button>
    </div>
  );
}
