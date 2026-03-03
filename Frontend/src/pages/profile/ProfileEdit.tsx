import useOwnership from "../../features/authorization/hooks/UseOwnership";
import { useParams } from "react-router-dom";
import { GoBack } from "../../components/GoBack";
import EditImageFormCard from "../../features/profile/components/edit/EditImageFormCard";
import { profileService } from "../../features/profile/services/ProfileService";
import EditDescriptionFormCard from "../../features/profile/components/edit/EditDescriptionFormCard";

export default function ProfileEdit() {
  const { userId } = useParams();
  const { isOwner } = useOwnership(userId ?? "");

  if (isOwner === null) {
    return <div>Loading...</div>;
  }

  if (isOwner === false) {
    return <GoBack />;
  }

  return (
    <div className="w-screen h-screen">
      <div className="flex w-full bg-red-800 justify-center items-center gap-20 p-2">
        <p style={{ fontSize: 30 }}>Profile edit</p>
      </div>
      <div className="flex justify-center items-center">
        <div className="flex w-2/3 bg-amber-400">
          <div className="w-full flex-col">
            <div className="flex justify-center items-center w-140 h-60 p-5">
              <EditImageFormCard
                Description={
                  "Choose a new avatar image (max 2MB). Click Save to apply your changes."
                }
                OnSave={async (file) => {
                  await profileService.uploadAvatar(userId ?? "", file);
                }}
              ></EditImageFormCard>
            </div>
            <div className="flex justify-center items-center w-140 h-60 p-5">
              <EditImageFormCard
                Description={
                  "Choose a new banner image (max 5MB). Click Save to apply your changes."
                }
                OnSave={async (file) => {
                  await profileService.uploadBanner(userId ?? "", file);
                }}
              ></EditImageFormCard>
            </div>
            <div className="flex justify-center items-center w-140 h-60 p-5">
              <EditImageFormCard
                Description={
                  "Choose a new backgorund image (max 8MB). Click Save to apply your changes."
                }
                OnSave={async (file) => {
                  await profileService.uploadBackground(userId ?? "", file);
                }}
              ></EditImageFormCard>
            </div>
          </div>
          <div className="w-full h-full p-5">
            <EditDescriptionFormCard
              OnSave={async (description) => {
                await profileService.updateDescription(userId ?? "", description);
              }}
            ></EditDescriptionFormCard>
          </div>
        </div>
      </div>
    </div>
  );
}
