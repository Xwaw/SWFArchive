import Button from "../../../../components/Buttons/Button";

export default function NavigationHome() {
  return (
    <div className="w-full h-[35px] flex shrink-0">
      <Button navigateOnClick="" style="main" font="Verdana">Home</Button>
      <Button navigateOnClick="/archive" style="main" font="Verdana">Archive</Button>
      <Button navigateOnClick="/profile/id" style="main" font="Verdana">Profile</Button>
      <Button navigateOnClick="/library/id" style="main" font="Verdana">Your Library</Button>
      <Button navigateOnClick="/friends/id" style="main" font="Verdana">Your Friends</Button>

      <Button navigateOnClick="/archive/date_leatest" style="main" font="Verdana" disabled>
        New Releases
      </Button>

      <Button navigateOnClick="/page/updates" style="main" font="Verdana" disabled>
        Page Updates
      </Button>

      <Button navigateOnClick="/page/qna" style="main" font="Verdana" disabled>
        QnA
      </Button>

      <Button navigateOnClick="" style="main" font="Verdana" disabled>
        About
      </Button>
    </div>
  );
}
