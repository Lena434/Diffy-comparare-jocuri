const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col items-center gap-2 text-sm">
        <p>
          © {new Date().getFullYear()} GameLens
        </p>

        <p>
          Frontend project – educational purpose
        </p>
      </div>
    </footer>
  );
};

export default Footer;