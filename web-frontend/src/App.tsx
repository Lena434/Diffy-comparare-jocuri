import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ui/ScrollToTop";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import GameListPage from "./pages/GameListPage";
import ComparePage from "./pages/ComparePage";
import GameDetailsPage from "./pages/GameDetailsPage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { ROUTES } from "./routes/routes";
import Guard from "./routes/Guard";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { SidebarProvider } from "./contexts/SidebarContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import FavoritesPage from "./pages/FavoritesPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <ThemeProvider>
    <AuthProvider>
    <FavoritesProvider>
    <SidebarProvider>
    <ScrollToTop />
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path={ROUTES.GAMES} element={<GameListPage />} />
        <Route path={ROUTES.GAME_DETAIL} element={<GameDetailsPage />} />
        <Route path={ROUTES.ABOUT} element={<AboutPage />} />

        {/* Protected routes - require login */}
        <Route element={<Guard requireAuth />}>
          <Route path={ROUTES.COMPARE} element={<ComparePage />} />
          <Route path={ROUTES.FAVORITES} element={<FavoritesPage />} />
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        </Route>
      </Route>

      {/* Public only routes - redirect if already logged in */}
      <Route element={<Guard publicOnly />}>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.SIGNUP} element={<SignUpPage />} />
      </Route>
    </Routes>
    </SidebarProvider>
    </FavoritesProvider>
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
