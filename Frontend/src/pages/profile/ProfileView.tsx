import AboutMeSection from "../../features/profile/components/sections/AboutMeSection";
import Banner from "../../features/profile/components/Banner";
import UserStatusSection from "../../features/profile/components/sections/UserStatusSection";
import UserInfo from "../../features/profile/components/UserInfo";
import BadgesSection from "../../features/profile/components/sections/BadgesSection";
import ItemsView from "../../features/profile/components/sections/ItemsView";
import CommentSection from "../../features/comments/components/CommentSection";

export default function ProfileView() {
  return (
    <div className="bg-[#222222] w-screen flex items-center justify-center p-15">
      <div className="w-5/7 min-h-screen p-5 flex">
        {/* Canvas */}
        <div className="flex flex-col w-full h-full">
          <div data-slot="profile-banner" className="w-full flex">
            <Banner image={undefined}></Banner>
          </div>

          <div className="w-full flex h-full">
            <div
              data-slot="left-side"
              className="p-2 w-1/3 h-full bg-amber-950 flex flex-col gap-2"
            >
              {/* LEFT SIDE */}
              <div
                data-section="aboutme-container"
                className="w-full h-85 overflow-y-auto bg-black"
              >
                <AboutMeSection
                  children={
                    <div className="flex flex-col gap-2">
                      <UserStatusSection />

                      <UserInfo
                        info={[
                          "JOINED: 00-00-0000 00:00",
                          "HOURS TOTAL: 0",
                          "FOLLOWERS: 0",
                          "UPLOADED: 0",
                        ]}
                      ></UserInfo>

                      <div className="flex justify-center items-center gap-20">
                        <div className="bg-red-900 hover:bg-red-600 w-25 h-10 flex justify-center items-center">
                          FOLLOW
                        </div>
                        <div className="bg-red-900 hover:bg-red-600 w-25 h-10 flex justify-center items-center">
                          MORE
                        </div>
                      </div>
                    </div>
                  }
                />
              </div>
              <div
                data-section="badges-container"
                className="w-full h-130 overflow-y-auto bg-black"
              >
                <BadgesSection
                  badges={[
                    "/test/Test_Badge.gif",
                    "/test/Admin_Badge_v2.gif",
                    "/test/Test_Badge.gif",
                    "/test/Admin_Badge.gif",
                    "/test/Admin_Badge_v2.gif",
                    "/test/Test_Badge.gif",
                    "/test/Admin_Badge.gif",
                    "/test/Test_Badge.gif",
                    "/test/Test_Badge.gif",
                    "/test/Test_Badge.gif",
                  ]}
                ></BadgesSection>
              </div>
            </div>
            <div
              data-slot="right-side"
              className="p-2 w-2/3 h-full bg-amber-600"
            >
              {/* RIGHT SIDE */}
              <div data-section="description" className="w-full h-full flex flex-col gap-5">
                <div>
                  <ItemsView items={["a", "a", "a", "a", "a", "a", "a", "a", "a", "a",]} name={"LAST PLAYED"} ></ItemsView>
                </div>
                <div>
                  <ItemsView items={["a", "a", "a", "a", "a", "a", "a", "a", "a", "a",]} name={"LAST CREATED POPULAR GAMES"} ></ItemsView>
                </div>
                <div>

                </div>
                <div className="w-full h-full">
                  <CommentSection targetId={"26f44794-dff2-46c6-8026-7e4c4b867dd1"} targetType={1} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
