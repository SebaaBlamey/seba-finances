"use client";

import { Card, CardBody } from "@heroui/react";
import Button from "@/presentation/components/common/Button";
import Input from "@/presentation/components/common/Input";
import LoadingSpinner from "@/presentation/components/common/LoadingSpinner";
import { useAuth } from "@/presentation/contexts/AuthContext";
import { useState } from "react";
import { useNavigation } from "@/presentation/hooks/useNavigation";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-default-100 p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo/Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-3xl shadow-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
              <path
                fillRule="evenodd"
                d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-foreground">Finanzas</h1>
            <p className="text-default-500 text-lg">Crea tu cuenta</p>
          </div>
        </div>

        {/* Register Form */}
        <Card className="shadow-large">
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
                  startContent={
                    <svg
                      className="w-4 h-4 text-default-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  }
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
                  startContent={
                    <svg
                      className="w-4 h-4 text-default-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  }
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
                  startContent={
                    <svg
                      className="w-4 h-4 text-default-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  }
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-danger-50 border border-danger-200">
                  <p className="text-danger text-sm">{error}</p>
                </div>
              )}

              <div className="space-y-4">
                <Button
                  type="submit"
                  isDisabled={loading}
                  className="w-full"
                  size="lg"
                >
                  {loading ? <LoadingSpinner size="small" /> : "Crear Cuenta"}
                </Button>

                <Button
                  variant="secondary"
                  className="w-full"
                  size="lg"
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
