import { useState } from "react";

export default function EditDescriptionFormCard({
  OnSave,
}: {
  OnSave: (description: string) => void;
}) {
  const [description, setDescription] = useState<string>("");

  const submitHandle = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!description) return;

    OnSave(description);
  };

  return (
    <form className="w-full h-full" onSubmit={submitHandle}>
      <div className="relative w-full h-10 bg-amber-600">
        <button
          className={`absolute w-30 h-10 ${!description ? "bg-red-600 cursor-not-allowed opacity-50" : "bg-red-900 cursor-pointer hover:bg-red-600"}`}
          type="submit"
          disabled={!description}
        >
          Save
        </button>
        <p
          style={{ fontSize: 18 }}
          className="flex w-full h-full justify-center items-center"
        >
          Here you can edit the profile description
        </p>
      </div>
      <textarea
        style={{ resize: "none" }}
        className="bg-amber-800 w-full h-60"
        onChange={(e) => {
          setDescription(e.currentTarget.value);
        }}
        value={description}
      />
    </form>
  );
}
