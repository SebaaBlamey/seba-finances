"use client";

import { useAuth } from "@/presentation/contexts/AuthContext";
import Dropdown from "@/presentation/components/common/Dropdown";
import { User, Menu, Moon, Sun } from "lucide-react";
import { Button } from "@heroui/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface HeaderProps {
  onSignOutClick: () => void;
  mLoading: boolean;
}

export default function Header({ onSignOutClick, mLoading }: HeaderProps) {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const dropdownOptions = [
    {
      key: "profile",
      label: "Mi perfil",
      onClick: () => {
        // TODO: Navigate to profile page
        console.log("Navigate to profile");
      },
    },
    {
      key: "logout",
      label: "Cerrar sesión",
      onClick: onSignOutClick,
      color: "danger" as const,
    },
  ];

  return (
    <header className="bg-surface/80 backdrop-blur-md sticky top-0 z-30 border-b border-surface-variant/20">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            {/* Mobile menu trigger is now handled in Sidebar component but we keep the title */}
            <h1 className="text-xl font-medium text-on-surface">
              Finanzas de <strong className="text-primary">{user?.name}</strong>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="hidden sm:flex text-on-surface-variant hover:text-primary"
              onPress={toggleTheme}
              isIconOnly
            >
              {mounted && theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            <Dropdown
              trigger={
                <Button
                  variant="flat"
                  className="bg-secondary-container text-on-secondary-container font-medium"
                  startContent={<User size={20} />}
                  radius="full"
                >
                  {user?.name || user?.email}
                </Button>
              }
              options={dropdownOptions}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
