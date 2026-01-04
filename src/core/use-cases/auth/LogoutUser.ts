import { IAuthRepository } from "@/core/repositories/IAuthRepository";

export class LogoutUserUseCase {
  constructor(private authRepository: IAuthRepository) {}
  async execute(): Promise<void> {
    await this.authRepository.signOut();
  }
}
