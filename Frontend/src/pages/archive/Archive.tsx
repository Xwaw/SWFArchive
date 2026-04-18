import { useEffect, useState, type SetStateAction } from "react";
import NavBar from "../../components/NavBar";
import SearchBar from "../../components/SearchBar";
import ArchiveList from "../../features/archive/components/ArchiveList";
import useArchive from "../../features/archive/hooks/UseArchive";
import { useSearchParams } from "react-router-dom";
import Select from "../../components/Select";
import {
  SortOptions,
  type SortGamesOptions,
} from "../../features/profile/types/types";
import TagInput from "../../features/tags/components/TagInput";

export default function Archive() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [tags, setTags] = useState<string[]>([]);

  const [searchInput, setSearchInput] = useState("");
  const search = searchParams.get("search") || "";
  const sort = (searchParams.get("sort") as SortGamesOptions) || "title";

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  const { archive, isLoading, error } = useArchive(search, sort);

  if (isLoading && !archive) return <div>LOADING...</div>;

  if (error)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <p
          style={{
            fontSize: 70,
            color: "red",
          }}
        >
          {error}
        </p>
      </div>
    );

  return (
    <div className="w-screen bg-blue-300">
      <NavBar />

      <div className="w-full h-full flex justify-center bg-blue-300">
        <div className="w-2/3 h-full flex flex-col bg-black">
          <div className="w-full h-40 bg-amber-700 flex justify-center items-center gap-25">
            <TagInput tags={tags} setTags={setTags}></TagInput>

            <SearchBar
              value={searchInput}
              onChange={(value) => {
                setSearchInput(value);
              }}
              onSubmit={(value) => {
                if (value !== "" && value !== null) {
                  setSearchParams({
                    search: value,
                    sort: sort
                  });
                }
              }}
            />

            <Select
              elements={SortOptions}
              value={sort}
              onChange={(sortSelect) => {
                const newSort = sortSelect as SortGamesOptions;

                setSearchParams({
                  search: search,
                  sort: newSort,
                });
              }}
            >
              Sort by:
            </Select>
          </div>
          {archive ? (
            <div>
              <ArchiveList children={archive?.items!}></ArchiveList>
            </div>
          ) : (
            <div
              className="w-full h-1/3 flex justify-center items-center text-red-600"
              style={{ fontSize: 50 }}
            >
              NO GAMES
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
