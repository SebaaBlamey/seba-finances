"use client";

import { Card, CardBody } from "@heroui/react";
import Button from "@/presentation/components/common/Button";
import Input from "@/presentation/components/common/Input";
import LoadingSpinner from "@/presentation/components/common/LoadingSpinner";
import { useAuth } from "@/presentation/contexts/AuthContext";
import { useState } from "react";
import { useNavigation } from "@/presentation/hooks/useNavigation";
import { Wallet, User, Mail, Lock } from "lucide-react";

export default function RegisterPage() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { navigateTo } = useNavigation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await signUp(name, email, password);
    setLoading(false);
    if (!result.success) {
      setError(result.error || "Unknown error");
      console.log(
        `credentials: name=${name}, email=${email}, password=${password}`,
      );
      console.error("Registration error:", result.error);
    } else {
      console.log("Registration successful");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-container rounded-[28px] shadow-sm">
            <Wallet className="w-10 h-10 text-on-primary-container" />
          </div>
          <div>
            <h1 className="text-[45px] leading-[52px] font-normal text-on-surface">
              Finanzas
            </h1>
            <p className="text-on-surface-variant text-lg">Crea tu cuenta</p>
          </div>
        </div>

        <Card className="bg-surface-container-low shadow-md rounded-[28px]">
          <CardBody className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <Input
                  type="text"
                  label="Nombre completo"
                  placeholder="Tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  isRequired
                  isDisabled={loading}
                  variant="flat"
                  radius="sm"
                  labelPlacement="inside"
                  startContent={
                    <User className="w-4 h-4 text-on-surface-variant" />
                  }
                  classNames={{
                    inputWrapper:
                      "bg-surface-variant/30 data-[hover=true]:bg-surface-variant/50 group-data-[focus=true]:bg-surface-variant/50",
                    label: "text-on-surface-variant",
                    input: "text-on-surface",
                  }}
                />
              </div>

              <div className="space-y-1">
                <Input
                  type="email"
                  label="Correo electrónico"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isRequired
                  isDisabled={loading}
                  variant="flat"
                  radius="sm"
                  labelPlacement="inside"
                  startContent={
                    <Mail className="w-4 h-4 text-on-surface-variant" />
                  }
                  classNames={{
                    inputWrapper:
                      "bg-surface-variant/30 data-[hover=true]:bg-surface-variant/50 group-data-[focus=true]:bg-surface-variant/50",
                    label: "text-on-surface-variant",
                    input: "text-on-surface",
                  }}
                />
              </div>

              <div className="space-y-1">
                <Input
                  type="password"
                  label="Contraseña"
                  placeholder="Mínimo 8 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isRequired
                  isDisabled={loading}
                  variant="flat"
                  radius="sm"
                  labelPlacement="inside"
                  startContent={
                    <Lock className="w-4 h-4 text-on-surface-variant" />
                  }
                  classNames={{
                    inputWrapper:
                      "bg-surface-variant/30 data-[hover=true]:bg-surface-variant/50 group-data-[focus=true]:bg-surface-variant/50",
                    label: "text-on-surface-variant",
                    input: "text-on-surface",
                  }}
                />
              </div>

              {error && (
                <div className="p-4 rounded-xl bg-error-container text-on-error-container">
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}

              <div className="flex flex-col gap-3 pt-2">
                <Button
                  type="submit"
                  isDisabled={loading}
                  className="w-full font-medium"
                  size="lg"
                  radius="full"
                >
                  {loading ? (
                    <LoadingSpinner size="small" color="white" />
                  ) : (
                    "Crear Cuenta"
                  )}
                </Button>

                <Button
                  variant="ghost"
                  className="w-full font-medium text-primary"
                  size="lg"
                  radius="full"
                  onPress={() => navigateTo("/login")}
                >
                  Ya tengo cuenta
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
