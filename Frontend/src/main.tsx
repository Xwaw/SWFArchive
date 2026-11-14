import { createRoot } from "react-dom/client";
import "./css/index.css";
import "./css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Archive from "./pages/archive/Archive";
import UploadGameToArchive from "./pages/archive/UploadGame";
import ArchiveGameView from "./pages/archive/ArchiveGameView";
import MobileGamePlayer from "./pages/game/MobileGamePlayer";
import Library from "./pages/library/Library";
import FriendsSelector from "./pages/profile/FriendsSelector";
import GamePlayer from "./pages/game/GamePlayer";
import Test from "./pages/Test";
import AdminPanel from "./pages/admin/AdminPanel";
import ProfileView from "./pages/profile/ProfileView";
import { AuthProvider } from "./features/authorization/hooks/UseAuth";
import ProfileEdit from "./pages/profile/ProfileEdit";
import Home from "./pages/home/Home";
import HallOfFame from "./pages/page/HallOfFame";
import AboutPage from "./pages/page/AboutPage";
import PageUpdates from "./pages/page/PageUpdates";
import QnA from "./pages/page/QnA";
import PrivacyPolicy from "./pages/page/PrivacyPolicy";
import AboutMe from "./pages/page/AboutMe";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/profile/:userId" element={<ProfileView />}></Route>
        <Route path="/profile/edit/:userId" element={<ProfileEdit />}></Route>

        <Route path="/archive" element={<Archive />}></Route>
        <Route path="/archive/upload" element={<UploadGameToArchive />}></Route>
        <Route path="/archive/game/:id" element={<ArchiveGameView />}></Route>

        <Route path="/library/:userId" element={<Library />}></Route>

        {/* ============ */}

        <Route path="/" element={<Home />}></Route>

        <Route path="/friends/:userId" element={<FriendsSelector />}></Route>

        <Route path="/play/:gameId" element={<GamePlayer />}></Route>
        <Route path="/mobile-play/:id" element={<MobileGamePlayer />}></Route>

        <Route path="/sandbox" element={<Test />}></Route>
        <Route path="/admin" element={<AdminPanel />}></Route>

        {/* ============ */}

        <Route path="/about" element={<AboutPage/>}></Route>
        <Route path="/myfavorites" element={<HallOfFame/>}></Route>
        <Route path="/page/updates" element={<PageUpdates/>}></Route>
        <Route path="/page/qna" element={<QnA/>}></Route>
        <Route path="/privacy" element={<PrivacyPolicy/>}></Route>
        <Route path="/contact" element={<AboutMe/>}></Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
