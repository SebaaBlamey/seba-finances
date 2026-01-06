"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Receipt,
  FolderKanban,
  Settings,
  Menu,
} from "lucide-react";
import { useState } from "react";
import {
  Button,
  Avatar,
  Drawer,
  DrawerContent,
  DrawerBody,
  DrawerHeader,
} from "@heroui/react";

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: ReactNode;
}

interface SidebarProps {
  activeRoute?: string;
  user?: {
    name: string;
    avatar?: string;
  };
  onNavigate?: (route: string) => void;
  className?: string;
}

const navItems: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    id: "transactions",
    label: "Transacciones",
    href: "/dashboard/transactions",
    icon: <Receipt size={20} />,
  },
  {
    id: "categories",
    label: "Categorías",
    href: "/dashboard/categories",
    icon: <FolderKanban size={20} />,
  },
  {
    id: "settings",
    label: "Configuración",
    href: "/dashboard/settings",
    icon: <Settings size={20} />,
  },
];

export default function Sidebar({
  activeRoute,
  user = { name: "Seba", avatar: undefined },
  onNavigate,
  className = "",
}: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const currentPath = activeRoute || pathname;

  const handleNavigate = (route: string) => {
    if (onNavigate) {
      onNavigate(route);
    }
    setIsOpen(false);
  };

  return (
    <>
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          isIconOnly
          variant="light"
          radius="full"
          onPress={() => setIsOpen(true)}
          aria-label="Open navigation menu"
          className="text-on-surface dark:text-dark-on-surface"
        >
          <Menu size={24} />
        </Button>
      </div>

      <Drawer
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        placement="left"
        size="xs"
        classNames={{
          base: "bg-surface dark:bg-dark-surface",
          closeButton: "hover:bg-surface-container-highest dark:hover:bg-dark-surface-container-highest",
        }}
      >
        <DrawerContent>
          <DrawerHeader className="px-4 pt-6 pb-2">
            <div className="text-title-large text-on-surface dark:text-dark-on-surface">Finanzas</div>
          </DrawerHeader>
          <DrawerBody className="p-0">
            <SidebarContent
              navItems={navItems}
              currentPath={currentPath}
              onNavigate={handleNavigate}
              user={user}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <div
        className={`hidden lg:flex w-[280px] bg-surface dark:bg-dark-surface border-r border-outline-variant dark:border-dark-outline-variant flex-col h-full ${className}`}
      >
        <SidebarContent
          navItems={navItems}
          currentPath={currentPath}
          onNavigate={handleNavigate}
          user={user}
        />
      </div>
    </>
  );
}

function SidebarContent({
  navItems,
  currentPath,
  onNavigate,
  user,
}: {
  navItems: NavItem[];
  currentPath: string;
  onNavigate: (route: string) => void;
  user: { name: string; avatar?: string };
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 mb-8 flex-shrink-0">
        <h1 className="text-title-large text-on-surface dark:text-dark-on-surface">Finanzas</h1>
      </div>

      <nav className="flex-1 px-4 overflow-y-auto min-h-0" aria-label="Main navigation">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  onClick={() => onNavigate(item.href)}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-3 px-4 py-3 rounded-full transition-all duration-200 focus-visible:ring-2 ring-primary ring-offset-2 ${
                    isActive
                      ? "bg-primary-container dark:bg-dark-primary-container text-on-primary-container dark:text-dark-on-primary-container"
                      : "text-on-surface-variant dark:text-dark-on-surface-variant hover:bg-surface-container-highest dark:hover:bg-dark-surface-container-highest"
                  }`}
                >
                  {item.icon}
                  <span className="text-label-large">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="pt-4 border-t border-outline-variant dark:border-dark-outline-variant flex-shrink-0 mt-4 p-4">
        <div className="flex items-center gap-3 px-4 py-3">
          <Avatar
            name={user.name}
            src={user.avatar}
            size="sm"
            className="bg-secondary-container text-on-secondary-container flex-shrink-0"
          />
          <span className="text-label-large text-on-surface dark:text-dark-on-surface flex-1">{user.name}</span>
        </div>
      </div>
    </div>
  );
}
