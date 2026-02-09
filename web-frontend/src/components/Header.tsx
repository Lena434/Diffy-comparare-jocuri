import { NavLink } from "react-router-dom";

const Header = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-blue-400 font-semibold"
      : "text-white hover:text-blue-300";

  return (
    <header className="bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo / title */}
        <h1 className="text-xl font-bold text-white">
          DIFFY
        </h1>

        {/* Navigation */}
        <nav className="flex gap-6">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/games" className={linkClass}>
            Game List
          </NavLink>

          <NavLink to="/compare" className={linkClass}>
            Compare Games
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;