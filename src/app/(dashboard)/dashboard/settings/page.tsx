"use client";

import React from "react";
import { useAuth } from "@/presentation/contexts/AuthContext";
import { Card, CardBody, Button, Switch, Avatar } from "@heroui/react";
import { User, Bell, Shield, Moon, LogOut, ChevronRight } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/presentation/utils/animations";

// Helper component for Chip since it wasn't imported
function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${className}`}>
      {children}
    </span>
  );
}

export default function SettingsPage() {
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();

  const sections = [
    {
      title: "Cuenta",
      items: [
        {
          icon: <User size={20} />,
          label: "Información Personal",
          description: "Actualiza tu nombre y correo",
          action: <ChevronRight size={20} className="text-on-surface-variant" />,
        },
        {
          icon: <Shield size={20} />,
          label: "Seguridad",
          description: "Cambiar contraseña y 2FA",
          action: <ChevronRight size={20} className="text-on-surface-variant" />,
        },
      ],
    },
    {
      title: "Preferencias",
      items: [
        {
          icon: <Moon size={20} />,
          label: "Modo Oscuro",
          description: "Cambiar apariencia de la app",
          action: (
            <Switch 
              isSelected={theme === "dark"} 
              onValueChange={(v) => setTheme(v ? "dark" : "light")}
            />
          ),
        },
        {
          icon: <Bell size={20} />,
          label: "Notificaciones",
          description: "Gestionar alertas y correos",
          action: <Switch defaultSelected />,
        },
      ],
    },
  ];

  return (
    <motion.div 
      className="container mx-auto max-w-3xl p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.header className="mb-8 text-center sm:text-left" variants={itemVariants}>
        <h1 className="text-display-small font-bold text-on-surface">Configuración</h1>
        <p className="text-body-large text-on-surface-variant">
          Gestiona tu cuenta y preferencias
        </p>
      </motion.header>

      <div className="space-y-6">
        {/* Profile Card */}
        <motion.div variants={itemVariants}>
          <Card className="bg-primary-container text-on-primary-container mb-8">
            <CardBody className="flex flex-col sm:flex-row items-center gap-6 p-6">
              <Avatar 
                src={`https://ui-avatars.com/api/?name=${user?.name}&background=random`} 
                className="w-24 h-24 text-2xl"
              />
              <div className="text-center sm:text-left flex-1">
                <h2 className="text-headline-small font-bold">{user?.name}</h2>
                <p className="text-body-large opacity-80">{user?.email}</p>
                <Chip className="mt-2 bg-on-primary-container/10 border-none text-on-primary-container">
                  Plan Gratuito
                </Chip>
              </div>
              <Button className="bg-on-primary-container text-primary-container font-medium">
                Editar Perfil
              </Button>
            </CardBody>
          </Card>
        </motion.div>

        {sections.map((section) => (
          <motion.div key={section.title} className="space-y-3" variants={itemVariants}>
            <h3 className="text-title-medium font-medium text-primary ml-2">
              {section.title}
            </h3>
            <Card className="bg-surface-container-low">
              <CardBody className="p-0 divide-y divide-surface-variant/20">
                {section.items.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center justify-between p-4 hover:bg-surface-variant/10 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-secondary-container text-on-secondary-container">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-body-large font-medium text-on-surface">
                          {item.label}
                        </p>
                        <p className="text-body-small text-on-surface-variant">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <div>{item.action}</div>
                  </div>
                ))}
              </CardBody>
            </Card>
          </motion.div>
        ))}

        <motion.div className="pt-8" variants={itemVariants}>
          <Button 
            color="danger" 
            variant="flat" 
            className="w-full" 
            startContent={<LogOut size={20} />}
            onPress={() => signOut()}
          >
            Cerrar Sesión
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
