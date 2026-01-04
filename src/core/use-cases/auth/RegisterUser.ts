import { User } from "@/core/entities/User";
import { IAuthRepository } from "@/core/repositories/IAuthRepository";

export class RegisterUserUseCase {
  constructor(private authRepository: IAuthRepository) {}
  async execute(name: string, email: string, password: string): Promise<User> {
    const supabaseUser = await this.authRepository.signUp(
      name,
      email,
      password,
    );
    return {
      id: supabaseUser.id,
      name: supabaseUser.name || "",
      email: supabaseUser.email,
      createdAt: new Date(supabaseUser.createdAt),
    };
  }
}
