import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
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
import AdminDashboard from "./pages/Admin";
import UsersAdmin from "./pages/UsersAdmin";
import Unauthorized from "./pages/401";
import Forbidden from "./pages/403";
import NotFound from "./pages/404";
import ServerError from "./pages/500";
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
        <Route path="/games" element={<GameListPage />} />
        <Route path="/games/:id" element={<GameDetailsPage />} />
        <Route path="/about" element={<AboutPage />} />

        {/* Protected routes - require login */}
        <Route element={<Guard requireAuth />}>
          <Route path="/compare" element={<ComparePage />} />
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
