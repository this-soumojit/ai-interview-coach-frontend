import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, LogIn, Mic2, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const isAuthPage =
    location.pathname === "/signin" || location.pathname === "/signup";

  if (isAuthPage) return null;

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="fixed top-0 w-full z-50 glass-panel border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/20 group-hover:shadow-brand-500/40 transition-all duration-300">
            <Mic2
              size={22}
              className="group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <span className="font-heading font-bold text-xl tracking-tight text-white group-hover:text-brand-400 transition-colors duration-300">
            Intervue<span className="text-brand-400">.ai</span>
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-slate-200 hover:text-white hover:bg-slate-800/70 transition-colors"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="text-sm font-medium text-brand-300 hover:text-white transition-colors duration-200"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                <LogIn size={16} />
                Sign In
              </Link>
              <Link to="/signup">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white hover:bg-slate-100 text-slate-900 px-5 py-2.5 rounded-full text-sm font-medium transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center gap-2"
                >
                  <User size={16} />
                  Get Started
                </motion.div>
              </Link>
            </>
          )}
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-slate-800/70 px-4 pb-4 pt-3 bg-slate-950/95 backdrop-blur">
          <div className="flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={closeMenu}
                  className="w-full text-left rounded-lg px-3 py-2.5 text-sm font-medium text-brand-300 hover:bg-slate-800/70"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/70 flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  onClick={closeMenu}
                  className="w-full text-left rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/70 flex items-center gap-2"
                >
                  <LogIn size={16} />
                  Sign In
                </Link>
                <Link to="/signup" onClick={closeMenu}>
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    className="bg-white hover:bg-slate-100 text-slate-900 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2"
                  >
                    <User size={16} />
                    Get Started
                  </motion.div>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
