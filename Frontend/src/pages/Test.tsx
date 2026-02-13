import { useNavigate } from "react-router-dom";
import { http } from "../http";
import { useState, type FormEvent } from "react";
import axios from "axios";

export default function Test() {
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <button
        onClick={async () => {
          try {
            const res = await http.post(`/mail/test`, {});
            console.log("OK:", res.data);
          } catch (err) {
            console.error("ERROR:", err);
          }
        }}
      >
        EMAIL
      </button>

      <form
        onSubmit={async (e) => {
          e.preventDefault();

          if (!file) return;

          const formData = new FormData();
          formData.append("file", file);

          await http.post(
  `/profile/avatar/1c524396-ae7d-418a-b599-e8d76dd1fcd0`,
  formData,
  {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }
);

        }}
      >
        <input
          type="file"
          name="file"
          onChange={(e) => {
            if (e.target.files) setFile(e.target.files[0]);
          }}
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
