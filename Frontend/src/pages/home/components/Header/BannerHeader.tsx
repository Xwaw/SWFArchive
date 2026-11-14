import { Link } from "react-router-dom";
import archiveLogo from "../../assets/swfarchive-logo.png";

export default function BannerHeader() {
  return (
    <Link
      className="home-brand"
      to="/archive"
    >
      <img
        src={archiveLogo}
        alt="SWFArchive — browse the archive"
        width={900}
        height={120}
        draggable={false}
      />
    </Link>
  );
}
