import Button from "../../../components/Buttons/Button";


export default function SearchGamesBar() {
  return (
    <div className="w-full h-full flex p-2 gap-2">
      <input
        type="search"
        name="search"
        className="flex-1 min-w-0 text-black border border-black bg-white outline-none focus:outline-none"
        placeholder="Search By Title"
        style={{
          borderRadius: "4px",
        }}
      />

      <Button
        type="submit"
        style="search"
        width="2.5rem"
        height="1.6rem"
      >
        <span
          style={{
            fontFamily: "Robot_Font",
            color: "#fa940f",
            WebkitTextStroke: "0.5px black",
            fontSize: "18px",
            lineHeight: 1,
            transform: "translateY(2px)",
          }}
        >
          GO!
        </span>
      </Button>
    </div>
  );
}