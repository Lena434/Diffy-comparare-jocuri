function NavigationBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-neon-purple/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-neon-purple to-neon-pink rounded-lg flex items-center justify-center">
              <span className="text-2xl">🎮</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
              GameLens
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-white hover:text-neon-cyan transition-colors">
              Home
            </a>
            <a href="#" className="text-white hover:text-neon-cyan transition-colors">
              Games
            </a>
            <a href="#" className="text-white hover:text-neon-cyan transition-colors">
              Compare
            </a>
            <a href="#" className="text-white hover:text-neon-cyan transition-colors">
              Favorites
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <button className="text-white hover:text-neon-cyan transition-colors">
              Login
            </button>
            <button className="px-6 py-2 bg-neon-purple hover:bg-neon-pink transition-all rounded-lg font-semibold">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;