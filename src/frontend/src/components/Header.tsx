import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { Menu, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { AppPage } from "../App";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

interface HeaderProps {
  page: AppPage;
  onNavigate: (page: AppPage) => void;
  onStartWizard: () => void;
}

export default function Header({
  page,
  onNavigate,
  onStartWizard,
}: HeaderProps) {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error) {
        console.error("Login error:", error);
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.button
            data-ocid="nav.link"
            onClick={() => onNavigate("landing")}
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-serif text-2xl font-bold text-espresso tracking-tight">
              Aura
            </span>
          </motion.button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              type="button"
              data-ocid="nav.home.link"
              onClick={() => onNavigate("landing")}
              className={`text-sm font-medium transition-colors hover:text-gold ${
                page === "landing" ? "text-gold" : "text-muted-foreground"
              }`}
            >
              Home
            </button>
            <button
              type="button"
              data-ocid="nav.wizard.link"
              onClick={onStartWizard}
              className={`text-sm font-medium transition-colors hover:text-gold ${
                page === "wizard" ? "text-gold" : "text-muted-foreground"
              }`}
            >
              Get Styled
            </button>
            <button
              type="button"
              data-ocid="nav.results.link"
              onClick={() => page !== "landing" && onNavigate("results")}
              className={`text-sm font-medium transition-colors hover:text-gold ${
                page === "results" ? "text-gold" : "text-muted-foreground"
              }`}
            >
              My Looks
            </button>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              data-ocid="auth.toggle"
              variant="outline"
              size="sm"
              className="rounded-full border-border text-foreground hover:border-gold hover:text-gold"
              onClick={handleAuth}
              disabled={isLoggingIn}
            >
              {isLoggingIn
                ? "Signing in..."
                : isAuthenticated
                  ? "Sign Out"
                  : "Login"}
            </Button>
            {!isAuthenticated && (
              <Button
                data-ocid="nav.signup.button"
                size="sm"
                className="rounded-full bg-gold text-white hover:bg-gold/90"
                onClick={onStartWizard}
              >
                Get Started
              </Button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <Menu className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 border-t border-border"
          >
            <nav className="flex flex-col gap-4">
              <button
                type="button"
                onClick={() => {
                  onNavigate("landing");
                  setMobileMenuOpen(false);
                }}
                className="text-sm font-medium text-muted-foreground hover:text-gold text-left"
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => {
                  onStartWizard();
                  setMobileMenuOpen(false);
                }}
                className="text-sm font-medium text-muted-foreground hover:text-gold text-left"
              >
                Get Styled
              </button>
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={handleAuth}
                  disabled={isLoggingIn}
                >
                  {isLoggingIn
                    ? "Signing in..."
                    : isAuthenticated
                      ? "Sign Out"
                      : "Login"}
                </Button>
                <Button
                  size="sm"
                  className="rounded-full bg-gold text-white"
                  onClick={() => {
                    onStartWizard();
                    setMobileMenuOpen(false);
                  }}
                >
                  Get Started
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
}
