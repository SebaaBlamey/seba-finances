"use client";
import { Card, CardBody, Button, Input } from "@heroui/react";
import { useAuth } from "@/presentation/contexts/AuthContext";
import { useState } from "react";
import { useNavigation } from "@/presentation/hooks/useNavigation";
import { Wallet } from "lucide-react";

export default function LoginPage() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { navigateTo } = useNavigation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await signIn(email, password);
    setLoading(false);
    if (!result.success) {
      setError(result.error || "Unknown error");
      console.error("Login error:", result.error);
    } else {
      console.log("Login successful");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-container rounded-[28px] shadow-sm mb-6">
            <Wallet className="w-10 h-10 text-on-primary-container" />
          </div>
          <h1 className="text-[45px] leading-[52px] font-normal text-on-surface mb-2">Finanzas</h1>
          <p className="text-on-surface-variant text-lg">Bienvenido de nuevo</p>
        </div>

        {/* Login Form */}
        <Card className="bg-surface-container-low shadow-md rounded-[28px]">
          <CardBody className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
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
                classNames={{
                  inputWrapper: "bg-surface-variant/30 data-[hover=true]:bg-surface-variant/50 group-data-[focus=true]:bg-surface-variant/50",
                  label: "text-on-surface-variant",
                  input: "text-on-surface",
                }}
              />

              <Input
                type="password"
                label="Contraseña"
                placeholder="Tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isRequired
                isDisabled={loading}
                variant="flat"
                radius="sm"
                labelPlacement="inside"
                classNames={{
                  inputWrapper: "bg-surface-variant/30 data-[hover=true]:bg-surface-variant/50 group-data-[focus=true]:bg-surface-variant/50",
                  label: "text-on-surface-variant",
                  input: "text-on-surface",
                }}
              />

              {error && (
                <div className="p-4 rounded-xl bg-error-container text-on-error-container">
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}

              <div className="flex flex-col gap-3 pt-2">
                <Button
                  type="submit"
                  color="primary"
                  size="lg"
                  className="w-full font-medium"
                  radius="full"
                  isDisabled={loading}
                >
                  {loading ? "Cargando..." : "Iniciar Sesión"}
                </Button>

                <Button
                  variant="bordered"
                  size="lg"
                  className="w-full font-medium border-outline text-primary"
                  radius="full"
                  onPress={() => navigateTo("/register")}
                >
                  Crear Cuenta
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
