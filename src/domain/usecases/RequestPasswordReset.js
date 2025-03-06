export default class RequestPasswordReset {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  async execute(email) {
    return await this.authRepository.requestPasswordReset(email);
  }
}
