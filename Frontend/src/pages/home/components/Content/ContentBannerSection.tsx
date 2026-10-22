import Button from "../../../../components/Buttons/Button";

export default function ContentBannerSection() {
  return (
    <section
      className="
        relative
        w-full
        h-[250px]
        overflow-hidden
        select-none
      "
      style={{
        borderTop: "2px solid #770000",
        borderLeft: "2px solid #770000",
        borderRight: "2px solid #DD7777",
        borderBottom: "2px solid #AA9999",

        backgroundImage: `url("/images/banners/FlashPlayer.png")`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* BUTTONS */}
      <div
        className="
          absolute
          left-[2%]
          bottom-[5%]

          flex
          items-center
          gap-5
        "
      >
        <Button
          style="search"
          width="130px"
          height="32px"
          href="/downloads/flashplayer_32_sa.exe"
          download
        >
          WINDOWS
        </Button>

        <Button
          style="search"
          width="130px"
          height="32px"
          href="/downloads/Projector.zip"
          download
        >
          MACOS
        </Button>

        <Button
          style="search"
          width="130px"
          height="32px"
          href="/downloads/flash_player_sa_linux.x86_64.tar"
          download
        >
          LINUX
        </Button>
      </div>

      {/* ROTATING FLASH GIF */}
      <div
        className="
          absolute
          right-[8%]
          top-1/2
          -translate-y-1/2

          h-[80%]
          aspect-square

          flex
          items-center
          justify-center
        "
      >
        <img
          src={"/gifs/flash_logo_anim.gif"}
          alt="Flash Player"
          draggable={false}
          className="
            max-w-full
            max-h-full
            object-contain
            pointer-events-none
          "
        />
      </div>
    </section>
  );
}
