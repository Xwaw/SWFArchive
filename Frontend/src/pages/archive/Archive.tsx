import axios from "axios";
import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Config } from "../../Config";
import NavBar from "../../components/NavBar";

interface GameCard {
  id: string,
  title: string;
  author: string;
  thumbnailUrl?: string;
  playsCount: number;
  swfUrl?: string;
}

interface PageResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export default function Archive() {
  const navigate = useNavigate();

  const [archiveData, setArchiveData] = useState<PageResult<GameCard> | null>(
    null
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const [inputSearch, setInputSearch] = useState("");

  const search = searchParams.get("search") ?? "";
  const page = Number(searchParams.get("page") ?? "1");

  const fetchArchive = async () => {
    try {
      const response = await axios.get<PageResult<GameCard>>(
        `${Config.API_URL}/archive`,
        {
          params: {
            search,
            page,
          },
        }
      );

      setArchiveData(response.data);
    } catch (error) {
      console.error(error);
      setArchiveData(null);
    }
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    setSearchParams({
      search: inputSearch.trim(),
      page: "1",
    });
  };

  const changePage = (newPage: number) => {
    if (
      newPage < 1 ||
      newPage > Math.ceil(archiveData!.total / archiveData!.pageSize)
    )
      return;

    setSearchParams({
      search,
      page: newPage.toString(),
    });
  };

  useEffect(() => {
    fetchArchive();
  }, [searchParams]);

  return (
    <div className="w-screen min-h-screen bg-blue-300">
      <NavBar>
        <form
          className="w-full h-10 flex justify-center items-center gap-2"
          onSubmit={handleSearch}
        >
          <input
            className="bg-amber-700 px-2 py-1 text-white"
            type="text"
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
            placeholder="Search games..."
          />
          <button type="submit" className="bg-red-600 text-white px-3 py-1">
            Search
          </button>
        </form>
      </NavBar>

      <div className="w-full flex justify-center bg-blue-300">
        <div className="w-2/3 min-h-full flex flex-col bg-black">
          <div className="w-full min-h-[900px] grid grid-cols-3 p-5 gap-5">
            {archiveData && archiveData.items.length === 0 && (
              <div className="col-span-3 text-center text-white text-lg">
                Error
              </div>
            )}

            {archiveData?.items.map((value, index) => (
              <div
                key={index}
                className="w-full h-60 cursor-pointer"
                onClick={() =>
                  navigate(`/archive/game/${value.id}`)
                }
              >
                <div className="w-full h-full bg-amber-700 hover:bg-red-600">
                  <p className="w-full p-1 flex justify-center items-center text-center">
                    {value.title}
                  </p>

                  <div className="w-full h-40 p-1">
                    {value.thumbnailUrl && (
                      <img
                        className="w-full h-full object-cover"
                        src={`${Config.API_URL}/${value.thumbnailUrl}`}
                        alt={value.title}
                      />
                    )}
                  </div>

                  <div className="w-full flex justify-center items-center p-1">
                    Plays: {value.playsCount}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {archiveData && archiveData.total > archiveData.pageSize && (
            <div className="w-full flex justify-center items-center gap-5 p-4 bg-black text-white">
              <button
                className="w-8 h-8 bg-amber-600 hover:bg-red-600"
                onClick={() => changePage(page - 1)}
              >
                {"<"}
              </button>

              <span>
                {archiveData.page} /{" "}
                {Math.ceil(archiveData.total / archiveData.pageSize)}
              </span>

              <button
                className="w-8 h-8 bg-amber-600 hover:bg-red-600"
                onClick={() => changePage(page + 1)}
              >
                {">"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
