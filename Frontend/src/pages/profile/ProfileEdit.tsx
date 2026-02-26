import useOwnership from "../../features/authorization/hooks/UseOwnership";
import { useParams } from "react-router-dom";
import { GoBack } from "../../components/GoBack";
import EditFormCard from "../../features/profile/components/edit/EditFormCard";
import { profileService } from "../../features/profile/services/ProfileService";

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
        <p style={{fontSize: 30}}>Profile edit</p>
      </div>
      <div className="flex justify-center items-center w-140 h-60 p-5">
        <EditFormCard Description={"aa"} OnSave={(file) => {profileService.uploadAvatar( userId ?? "", file )}}></EditFormCard>
      </div>
    </div>
  );
}
