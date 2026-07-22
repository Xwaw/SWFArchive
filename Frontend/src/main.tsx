import { createRoot } from "react-dom/client";
import "./css/index.css";
import "./css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Archive from "./pages/archive/Archive";
import UploadGameToArchive from "./pages/archive/UploadGame";
import ArchiveGameView from "./pages/archive/ArchiveGameView";
import MobileGamePlayer from "./pages/game/MobileGamePlayer";
import Library from "./pages/library/Library";
import FriendsSelector from "./pages/profile/FriendsSelector";
import GamePlayer from "./pages/game/GamePlayer";
import Test from "./pages/Test";
import AdminPanel from "./pages/admin/AdminPanel";
import AuthorizationPanel from "./pages/autherization/AuthorizationPanel";
import ProfileView from "./pages/profile/ProfileView";
import { AuthOnly, AuthProvider, GuestOnly } from "./features/authorization/hooks/UseAuth";
import ProfileEdit from "./pages/profile/ProfileEdit";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<GuestOnly />}>
          <Route path="/auth/login" element={<AuthorizationPanel mode="login"/>}></Route>
          <Route path="/auth/register" element={<AuthorizationPanel mode="register"/>}></Route>
          <Route path="/auth/forgot" element={<AuthorizationPanel mode="forgot"/>}></Route>
          <Route path="/auth/reset" element={<AuthorizationPanel mode="reset"/>}></Route>
          <Route path="/auth/info" element={<AuthorizationPanel mode="info"/>}/>
        </Route>

        <Route element={<AuthOnly />}>
          <Route path="/auth/change" element={<AuthorizationPanel mode="change"/>}></Route>
        </Route>

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
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
