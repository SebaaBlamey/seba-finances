"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CreditCard, BarChart3, Settings, Menu } from "lucide-react";
import { useState } from "react";
import { Button, Drawer, DrawerContent, DrawerBody, DrawerHeader } from "@heroui/react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Transacciones", href: "/dashboard/transactions", icon: CreditCard },
  { name: "Categorías", href: "/dashboard/categories", icon: BarChart3 },
  { name: "Configuración", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const NavContent = () => (
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
                <item.icon className={`mr-3 h-6 w-6 ${isActive ? "fill-current" : ""}`} />
                <span className="text-base tracking-wide">{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  return (
    <>
      {/* Mobile Trigger */}
      <Button 
        isIconOnly 
        variant="light" 
        onPress={() => setIsOpen(true)}
        className="lg:hidden text-on-surface"
      >
        <Menu size={24} />
      </Button>

      {/* Mobile Drawer */}
      <Drawer 
        isOpen={isOpen} 
        onOpenChange={setIsOpen} 
        placement="left"
        size="xs"
        classNames={{
          base: "bg-surface-container-low",
          closeButton: "hover:bg-surface-variant/20 active:bg-surface-variant/30 top-4 right-4",
        }}
      >
        <DrawerContent>
          <DrawerHeader className="flex flex-col gap-1 px-6 pt-8 pb-4">
            <h2 className="text-2xl font-normal text-on-surface">Menú</h2>
          </DrawerHeader>
          <DrawerBody className="p-0">
            <NavContent />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Desktop Sidebar (Navigation Rail/Drawer) */}
      <div className="hidden lg:block w-80 bg-surface-container-low h-screen fixed left-0 top-0 border-r border-surface-variant/20 z-40 pt-20">
        <NavContent />
      </div>
      
      {/* Spacer for desktop content */}
      <div className="hidden lg:block w-80 flex-shrink-0" />
    </>
  );
}

