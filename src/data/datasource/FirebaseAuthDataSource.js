// src/data/datasource/FirebaseAuthDataSource.js
import auth from '@react-native-firebase/auth';
import UserModel from '../models/UserModel';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default class FirebaseAuthDataSource {
  async loginWithEmail(email, password) {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      return UserModel.fromFirebaseUser(userCredential.user);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async requestPasswordReset(email) {
    try {
      await auth().sendPasswordResetEmail(email);
      return { message: 'Password reset email sent' };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async loginWithGoogle() {
    GoogleSignin.configure({
      webClientId: '378041734655-e14ucfihssugqq76u9crn3qmvatn8399.apps.googleusercontent.com',
      scopes: ['profile', 'email']
    });
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Initiate Google Sign-In and get user info (including idToken)
    await GoogleSignin.signOut();
    console.log('sign in with google')
    const userInfo = await GoogleSignin.signIn();
    console.log("User info: ", userInfo);
    
    const { idToken } = userInfo;
    if (!idToken) {
      throw new Error('No ID token found');
    }
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign in with Firebase using the Google credential
    const userCredential = await auth().signInWithCredential(googleCredential);
    return UserModel.fromFirebaseUser(userCredential.user);
  }
}
