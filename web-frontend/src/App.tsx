import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import GameListPage from "./pages/GameListPage";  

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/games" element={<GameListPage />} />
      </Route>
    </Routes>
  );
}

export default App;
