
import { NavLink } from 'react-router-dom';

function NavigationBar() {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      <NavLink 
        to="/games"
        className={({ isActive }) => 
          isActive 
            ? "text-neon-cyan font-semibold" 
            : "text-white hover:text-neon-cyan transition-colors"
        }
      >
        Games
      </NavLink>
      <NavLink 
        to="/compare"
        className={({ isActive }) => 
          isActive 
            ? "text-neon-cyan font-semibold" 
            : "text-white hover:text-neon-cyan transition-colors"
        }
      >
        Compare
      </NavLink>
      <NavLink 
        to="/favorites"
        className={({ isActive }) => 
          isActive 
            ? "text-neon-cyan font-semibold" 
            : "text-white hover:text-neon-cyan transition-colors"
        }
      >
        Favorites
      </NavLink>









    </nav>
  );
}
export default NavigationBar;