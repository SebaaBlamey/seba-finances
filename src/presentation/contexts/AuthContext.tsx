"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/core/entities/User";
import { supabase } from "@/infrastructure/services/supabase/client";
import { SupabaseAuthRepository } from "@/infraestructure/repositories/SupabaseAuthRepository";
import { LoginUserUseCase } from "@/core/use-cases/auth/LoginUser";
import { RegisterUserUseCase } from "@/core/use-cases/auth/RegisterUser";
import { LogoutUserUseCase } from "@/core/use-cases/auth/LogoutUser";
import { Result } from "@/core/types/Result";
import { useNavigation } from "../hooks/useNavigation";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<Result<void>>;
  signUp: (
    name: string,
    email: string,
    password: string,
  ) => Promise<Result<void>>;
  signOut: () => Promise<Result<void>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { navigateTo } = useNavigation();

  const authRepository = new SupabaseAuthRepository(supabase);
  const loginUseCase = new LoginUserUseCase(authRepository);
  const registerUseCase = new RegisterUserUseCase(authRepository);
  const logoutUseCase = new LogoutUserUseCase(authRepository);

  useEffect(() => {
    // validar sesion actual
    authRepository.getCurrentUser().then((user) => {
      if (user) {
        setUser(user);
      }
      setLoading(false);
    });

    // login/logout listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          name: session.user.user_metadata.full_name || "",
          email: session.user.email || "",
          createdAt: new Date(session.user.created_at),
        });
      } else {
        setUser(null);
      }
    });
    return () => subscription.unsubscribe();
  });

  const signIn = async (
    email: string,
    password: string,
  ): Promise<Result<void>> => {
    try {
      await loginUseCase.execute(email, password);
      navigateTo("/dashboard");
      return { success: true, data: undefined };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : "Unknown error",
      };
    }
  };

  const signUp = async (
    name: string,
    email: string,
    password: string,
  ): Promise<Result<void>> => {
    try {
      await registerUseCase.execute(name, email, password);
      return { success: true, data: undefined };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : "Unknown error",
      };
    }
  };

  const signOut = async (): Promise<Result<void>> => {
    try {
      await logoutUseCase.execute();
      return { success: true, data: undefined };
    } catch (err) {
      console.error("Error during sign out:", err);
      return {
        success: false,
        error: err instanceof Error ? err.message : "Unknown error",
      };
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used withing AuthProvider");
  }
  return context;
};
