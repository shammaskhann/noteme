class User {
  constructor({
    username,
    email,
    googleId,
    notes = [],
    _id,
    createdAt,
    updatedAt,
  }) {
    this.username = username;
    this.email = email;
    this.googleId = googleId;
    this.notes = notes;
    this._id = _id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJson(json) {
    return new User(json);
  }

  toJson() {
    return {
      username: this.username,
      email: this.email,
      googleId: this.googleId,
      notes: this.notes,
      _id: this._id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export default User;
