"use client";

import { Bell, Sun, Moon } from "lucide-react";
import {
  Button,
  Badge,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { useAuth } from "@/presentation/contexts/AuthContext";

interface HeaderProps {
  pageTitle?: string;
  subtitle?: string;
  notificationCount?: number;
  onNotificationClick?: () => void;
  onThemeToggle?: () => void;
  currentTheme?: "light" | "dark";
  user?: {
    name: string;
    avatar?: string;
  };
  className?: string;
}

export default function Header({
  pageTitle = "Finanzas de Seba",
  subtitle = "Aquí tienes tu resumen financiero de hoy",
  notificationCount = 3,
  onNotificationClick,
  onThemeToggle,
  currentTheme,
  className = "",
}: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const { user: authUser, signOut } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const effectiveTheme = currentTheme || theme;
  const userInfo = authUser
    ? { name: authUser.name || authUser.email || "Usuario", avatar: undefined }
    : { name: "Seba", avatar: undefined };

  const handleThemeToggle = () => {
    if (onThemeToggle) {
      onThemeToggle();
    } else {
      setTheme(theme === "light" ? "dark" : "light");
    }
  };

  const handleNotificationClick = () => {
    if (onNotificationClick) {
      onNotificationClick();
    } else {
      console.log("Notifications clicked");
    }
  };

  return (
    <header
      className={`sticky top-0 z-10 bg-surface dark:bg-dark-surface border-b border-outline-variant dark:border-dark-outline-variant shadow-sm ${className}`}
    >
      <div className="px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-headline-small text-on-surface dark:text-dark-on-surface">
            {pageTitle}
          </h1>
          <p className="text-body-medium text-on-surface-variant dark:text-dark-on-surface-variant">
            {subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {mounted && (
            <Button
              isIconOnly
              variant="light"
              radius="full"
              aria-label={`Switch to ${effectiveTheme === "light" ? "dark" : "light"} mode`}
              onPress={handleThemeToggle}
              className="text-on-surface-variant dark:text-dark-on-surface-variant hover:text-on-surface dark:hover:text-dark-on-surface"
            >
              {effectiveTheme === "light" ? (
                <Moon size={20} />
              ) : (
                <Sun size={20} />
              )}
            </Button>
          )}

          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button variant="light" className="gap-2" aria-label="User menu">
                <Avatar
                  name={userInfo.name}
                  src={userInfo.avatar}
                  size="sm"
                  className="bg-primary-container text-on-primary-container"
                />
                <span className="text-label-large text-on-surface dark:text-dark-on-surface hidden sm:inline">
                  {userInfo.name}
                </span>
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="User actions">
              <DropdownItem key="profile" className="text-label-large">
                Perfil
              </DropdownItem>
              <DropdownItem key="settings" className="text-label-large">
                Configuración
              </DropdownItem>
              <DropdownItem
                key="logout"
                className="text-label-large text-error"
                color="danger"
                onPress={signOut}
              >
                Cerrar Sesión
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}
