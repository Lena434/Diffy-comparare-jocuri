import { NavLink } from "react-router-dom";
import { ROUTES } from "../routes/routes";

function NavigationBar() {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      <NavLink
        to={ROUTES.GAMES}
        className={({ isActive }) =>
          isActive
            ? "text-neon-cyan font-semibold"
            : "text-white hover:text-neon-cyan transition-colors"
        }
      >
        Games
      </NavLink>

      <NavLink
        to={ROUTES.COMPARE}
        className={({ isActive }) =>
          isActive
            ? "text-neon-cyan font-semibold"
            : "text-white hover:text-neon-cyan transition-colors"
        }
      >
        Compare
      </NavLink>

    </nav>
  );
}

export default NavigationBar;
