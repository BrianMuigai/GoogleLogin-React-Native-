import AuthRepositoryInterface from "../../domain/repositories/AuthRepositoryInterface";
import FirebaseAuthDataSource from "../datasource/FirebaseAuthDataSource";

export default class AuthRepositoryImpl extends AuthRepositoryInterface {
  constructor() {
    super();
    this.authDataSource = new FirebaseAuthDataSource();
  }

  async loginWithEmail(email, password) {
    return await this.authDataSource.loginWithEmail(email, password);
  }

  async requestPasswordReset(email) {
    return await this.authDataSource.requestPasswordReset(email);
  }

  async loginWithGoogle() {
    return await this.authDataSource.loginWithGoogle();
  }
}
