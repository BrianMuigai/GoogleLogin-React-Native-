export default class LoginWithEmail {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  async execute(email, password) {
    return await this.authRepository.loginWithEmail(email, password);
  }
}
