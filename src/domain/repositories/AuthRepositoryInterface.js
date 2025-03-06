export default class AuthRepositoryInterface {
  async loginWithEmail(email, password) {
    throw new Error("Method not implemented");
  }

  async requestPasswordReset(email) {
    throw new Error("Method not implemented");
  }

  async loginWithGoogle(googleIdToken) {
    throw new Error("Method not implemented");
  }
}
