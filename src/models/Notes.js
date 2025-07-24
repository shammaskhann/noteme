class Notes {
  constructor(content, _id, userId, updatedAt, color) {
    this.content = content;
    this._id = _id;
    this.userId = userId;
    this.updatedAt = updatedAt;
    this.color = color;
  }

  static fromJson(json) {
    return new Notes(
      json.content,
      json._id,
      json.userId,
      json.updatedAt,
      json.color
    );
  }

  toJson() {
    return {
      content: this.content,
      updatedAt: this.updatedAt,
      color: this.color,
      _id: this._id,
      userId: this.userId,
    };
  }
}

export default Notes;
