import { User } from "@/core/entities/User";
import { IAuthRepository } from "@/core/repositories/IAuthRepository";
import { SupabaseClient } from "@supabase/supabase-js";

export class SupabaseAuthRepository implements IAuthRepository {
  constructor(private supabase: SupabaseClient) {}

  async signIn(email: string, password: string): Promise<User> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error(error.message);
    if (!data.user) throw new Error("User not found");

    return {
      id: data.user.id,
      name: data.user.user_metadata.full_name || "",
      email: data.user.email || "",
      createdAt: new Date(data.user.created_at),
    };
  }

  async signUp(name: string, email: string, password: string): Promise<User> {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });
    if (error) throw new Error(error.message);
    if (!data.user) throw new Error("User not found");

    return {
      id: data.user.id,
      name: data.user.user_metadata.full_name || "",
      email: data.user.email || "",
      createdAt: new Date(data.user.created_at),
    };
  }

  async signOut(): Promise<void> {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw new Error(error.message);
  }

  async getCurrentUser(): Promise<User | null> {
    const { data, error } = await this.supabase.auth.getUser();
    if (error) {
      if (
        error.message.includes("Auth session missing") ||
        error.message.includes("No user found")
      ) {
        return null;
      }
      throw new Error(error.message);
    }
    if (!data.user) return null;

    return {
      id: data.user.id,
      name: data.user.user_metadata.full_name || "",
      email: data.user.email || "",
      createdAt: new Date(data.user.created_at),
    };
  }
}
