// src/domain/usecases/LoginWithGoogle.js
export default class LoginWithGoogle {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  async execute() {
    return await this.authRepository.loginWithGoogle();
  }
}
