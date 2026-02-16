import { useNavigate } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import { ROUTES } from '../routes/routes';

function Header() {
  const navigate = useNavigate();




  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-neon-purple/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo - clickable */}
          <div 
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-neon-purple to-neon-pink rounded-lg flex items-center justify-center">
              <span className="text-2xl">🎮</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
              Diffy
            </span>
          </div>

          {/* Navigation Links - Navbar component */}
          <NavigationBar />




          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(ROUTES.LOGIN)}
              className="text-white hover:text-neon-cyan transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => navigate(ROUTES.SIGNUP)}
              className="px-6 py-2 bg-neon-purple hover:bg-neon-pink transition-all rounded-lg font-semibold"
            >
              Sign Up
            </button>
          </div>
          
        </div>
      </div>
    </header>
  );
}

export default Header;