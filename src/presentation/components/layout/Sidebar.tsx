"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CreditCard, BarChart3, Settings, Menu } from "lucide-react";
import { useState } from "react";
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerBody,
  DrawerHeader,
} from "@heroui/react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Transacciones", href: "/dashboard/transactions", icon: CreditCard },
  { name: "Categorías", href: "/dashboard/categories", icon: BarChart3 },
  { name: "Configuración", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Trigger - Fixed position for mobile access */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          isIconOnly
          variant="light"
          onPress={() => setIsOpen(true)}
          className="text-on-surface"
        >
          <Menu size={24} />
        </Button>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        placement="left"
        size="xs"
        classNames={{
          base: "bg-surface-container-low",
          closeButton:
            "hover:bg-surface-variant/20 active:bg-surface-variant/30 top-4 right-4",
        }}
      >
        <DrawerContent>
          <DrawerHeader className="flex flex-col gap-1 px-6 pt-8 pb-4">
            <h2 className="text-2xl font-normal text-on-surface">Menú</h2>
          </DrawerHeader>
          <DrawerBody className="p-0">
            <NavContent pathname={pathname} setIsOpen={setIsOpen} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Desktop Sidebar - Static relative positioning */}
      <div className="hidden lg:block w-80 bg-surface-container-low border-r border-surface-variant/20 min-h-screen pt-20">
        <NavContent pathname={pathname} setIsOpen={setIsOpen} />
      </div>
    </>
  );
}

function NavContent({ pathname, setIsOpen }: { pathname: string; setIsOpen: (open: boolean) => void }) {
  return (
    <nav className="mt-4 px-2">
      <ul className="space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.name}>
              <Link
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center px-6 py-4 text-sm font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-secondary-container text-on-secondary-container"
                    : "text-on-surface-variant hover:bg-surface-variant/30 hover:text-on-surface"
                }`}
              >
                <item.icon className={"mr-3 h-6 w-6"} />
                <span className="text-base tracking-wide">{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
