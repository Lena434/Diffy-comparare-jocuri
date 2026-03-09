import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ui/ScrollToTop";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import HomePage from "./pages/HomePage";
import GameListPage from "./pages/GameListPage";
import ComparePage from "./pages/ComparePage";
import GameDetailsPage from "./pages/GameDetailsPage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import AdminDashboard from "./pages/admin/Dashboard";
import UsersAdmin from "./pages/admin/Users";
import AdminGames from "./pages/admin/Games";
import AdminGameDetail from "./pages/admin/GameDetail";
import AdminComparisons from "./pages/admin/Comparisons";
import AdminSettings from "./pages/admin/Settings";
import AdminUserDetail from "./pages/admin/UserDetail";
import Unauthorized from "./pages/error/401";
import Forbidden from "./pages/error/403";
import NotFound from "./pages/error/404";
import ServerError from "./pages/error/500";
import { ROUTES } from "./routes/routes";
import Guard from "./routes/Guard";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { SidebarProvider } from "./contexts/SidebarContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import FavoritesPage from "./pages/FavoritesPage";


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

      {/* Admin routes - require admin role */}
      <Route element={<Guard requireAuth allowRoles={['admin']} />}>
        <Route element={<AdminLayout />}>
          <Route path={ROUTES.ADMIN} element={<AdminDashboard />} />
          <Route path={ROUTES.ADMIN_USERS} element={<UsersAdmin />} />
          <Route path={ROUTES.ADMIN_USER_DETAIL} element={<AdminUserDetail />} />
          <Route path={ROUTES.ADMIN_GAMES} element={<AdminGames />} />
          <Route path={ROUTES.ADMIN_GAME_DETAIL} element={<AdminGameDetail />} />
          <Route path={ROUTES.ADMIN_COMPARISONS} element={<AdminComparisons />} />
          <Route path={ROUTES.ADMIN_SETTINGS} element={<AdminSettings />} />
        </Route>
      </Route>

      {/* Error pages */}
      <Route path="/401" element={<Unauthorized />} />
      <Route path="/403" element={<Forbidden />} />
      <Route path="/500" element={<ServerError />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </SidebarProvider>
    </FavoritesProvider>
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
