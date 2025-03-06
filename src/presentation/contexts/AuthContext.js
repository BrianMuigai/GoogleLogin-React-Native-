import React, { createContext } from "react";
import AuthRepositoryImpl from "../../data/repositories/AuthRepositoryImpl";
import LoginWithEmail from "../../domain/usecases/LoginWithEmail";
import RequestPasswordReset from "../../domain/usecases/RequestPasswordReset";
import LoginWithGoogle from "../../domain/usecases/LoginWithGoogle";

// Create repository instance
const authRepository = new AuthRepositoryImpl();

// Create use cases
const loginWithEmailUseCase = new LoginWithEmail(authRepository);
const requestPasswordResetUseCase = new RequestPasswordReset(authRepository);
const loginWithGoogleUseCase = new LoginWithGoogle(authRepository);

export const AuthContext = createContext({
  loginWithEmailUseCase: null,
  requestPasswordResetUseCase: null,
  loginWithGoogleUseCase: null,
});

export const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider
      value={{
        loginWithEmailUseCase,
        requestPasswordResetUseCase,
        loginWithGoogleUseCase,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
