import type { FormEvent } from "react";
import { archiveService } from "../../services/ArchiveService";
import TagInput from "./TagInput";

export default function UploadGameForm() {
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    await archiveService.UploadNewGame(formData)
  };

  return (
    <div className="w-screen h-screen">
      <div className="flex w-full bg-red-800 justify-center items-center gap-20 p-2">
        <p style={{ fontSize: 30 }}>Upload game</p>
      </div>

      <div className="flex justify-center items-center">
        <form
          onSubmit={submitHandler}
          className="flex w-2/3 bg-amber-400 p-4 gap-4"
        >
          <div className="w-1/2 flex flex-col gap-4 bg-gray-800 p-4">
            <div className="w-full h-24 bg-green-800 p-2">
              Title
              <input type="text" name="title" className="block border" />
            </div>

            <div className="w-full h-24 bg-green-800 p-2">
              Author name
              <input type="text" name="author" className="block border" />
            </div>

            <div className="w-full h-56 bg-green-800 p-2">
              Description
              <textarea name="description" className="w-full h-32 border" />
            </div>
          </div>

          <div className="w-1/2 flex flex-col gap-4 bg-gray-800 p-4">
            <div className="w-full h-24 bg-green-800 p-2">
              Game file
              <input type="file" name="swfGame" className="block" accept=".swf"/>
            </div>

            <div className="w-full h-24 bg-green-800 p-2">
              Thumbnail
              <input type="file" name="thumbnail" className="block" accept="image" />
            </div>

            <div className="w-full h-min-24 bg-green-800 p-2">
              Tags
              <TagInput></TagInput>
            </div>

            <div className="w-full h-24 bg-gray-800 p-2 flex items-end justify-end gap-2">
              <button type="submit" className="w-28 h-10 bg-black border">
                Upload
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}