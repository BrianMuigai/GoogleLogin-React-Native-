// src/data/models/UserModel.js
export default class UserModel {
  constructor({ uid, email, displayName }) {
    this.uid = uid;
    this.email = email;
    this.displayName = displayName;
  }

  static fromFirebaseUser(firebaseUser) {
    return new UserModel({
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName || "",
    });
  }
}
