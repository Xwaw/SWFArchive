import { useState, useEffect } from "react";
import type { EditFormProps } from "../../types/props";

export default function EditImageFormCard({
  Description,
  ImageUrl,
  OnSave,
}: EditFormProps) {
  const [file, setFile] = useState<File | undefined>();
  const [preview, setPreview] = useState<string | undefined>(ImageUrl);

  useEffect(() => {
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    await OnSave(file);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full h-full bg-[#393939] flex">
      <div
        className="h-full aspect-square cursor-pointer bg-gray-800"
        style={{
          backgroundImage: preview ? `url(${preview})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <input
          type="file"
          accept="image/*"
          className="w-full h-full opacity-0 cursor-pointer"
          onChange={(e) => {
            const selected = e.currentTarget.files?.[0];
            if (selected) setFile(selected);
          }}
        />
      </div>

      <div className="flex flex-col w-full h-full">
        <div className="h-2/3">
          <p className="flex items-center w-full h-full p-4 break-all">
            {Description}
          </p>
        </div>

        <div className="h-1/3 flex">
          <button
            disabled={!file}
            className={`w-1/2 h-full p-2 transition${
              !file
                ? "bg-zinc-600 cursor-not-allowed opacity-50"
                : "bg-zinc-700 hover:bg-zinc-600 cursor-pointer"
            }
            `}
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
