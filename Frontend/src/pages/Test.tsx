
import { authService } from "../features/authorization/services/AuthService";
import RecommendedTags from "../features/tags/components/RecommendedTags";

export default function Test() {

  return (
    <div className="w-screen h-screen flex justify-center items-center gap-20">
      <button className="cursor-pointer bg-amber-600 hover:bg-red-600" onClick={() => authService.logout()}>
        Sign Out
      </button>
      <div>
        <RecommendedTags name={""} />
      </div>
    </div>
  );
}
