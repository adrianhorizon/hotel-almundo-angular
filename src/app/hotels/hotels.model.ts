export class Question {
    _id?: string;
    description: string;
    createdAt?: Date;
  
    constructor(
      description: string,
      createdAt?: Date,
      icon?: string
    ) {
      this._id = '1';
      this.description = description;
      this.createdAt = createdAt;
    }
  }
  