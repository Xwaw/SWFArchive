/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import SimpleMenuPanel from "../../../../components/MenuTabs/SimpleMenuPanel";
import useGitInfo from "../../../../features/updates/hooks/UseGitInfo";
import { useNavigate } from "react-router-dom";

export default function HomeRightSidebar() {
  const { isLoading, error, updates, fetchGitInfo } = useGitInfo();
  const navigate = useNavigate();

  useEffect(() => {
    fetchGitInfo();
  }, []);

  return (
    <aside className="w-[300px] shrink-0 flex flex-col gap-2 p-1">
      <div className="w-full h-[800px] border-4">
        <img
          className="w-full h-full bg-cover"
          src="/test/images/banners/1.png"
          alt=""
        />
      </div>

      <SimpleMenuPanel //if /page/updates is clicked, navigate to that page by url /page/updates/:sha
        title="Most Recent Updates"
        bottom={<p className="hover:cursor-pointer hover:underline active:opacity-50" onClick={() => navigate("/page/updates")}>See more</p>}
        items={
          isLoading
            ? [{ label: "Loading..." }]
            : error
              ? [{ label: "Error fetching updates" }]
              : (updates?.map((update) => ({
                  label: update.message,
                })) ?? [])
        }
      />
    </aside>
  );
}
