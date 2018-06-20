export class User {
    constructor(
      public email: string,
      public password: string,
      public firstName?: string,
      public userName?: string,
      public _id?: string
    ) { }

    fullName() {
      return `${this.firstName}`;
    }
  }
