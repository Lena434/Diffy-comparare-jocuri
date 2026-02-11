import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import GameListPage from "./pages/GameListPage";
import ComparePage from "./pages/ComparePage";
import { ROUTES } from "./routes/routes";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path={ROUTES.GAMES} element={<GameListPage />} />
        <Route path={ROUTES.COMPARE} element={<ComparePage />} />
      </Route>
    </Routes>
  );
}

export default App;
