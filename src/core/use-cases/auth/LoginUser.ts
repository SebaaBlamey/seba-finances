import { User } from "@/core/entities/User";
import { IAuthRepository } from "@/core/repositories/IAuthRepository";

export class LoginUserUseCase {
  constructor(private authRepository: IAuthRepository) {}
  async execute(email: string, password: string): Promise<User> {
    const supabaseUser = await this.authRepository.signIn(email, password);
    return {
      id: supabaseUser.id,
      name: supabaseUser.name || "",
      email: supabaseUser.email,
      createdAt: new Date(supabaseUser.createdAt),
    };
  }
}
