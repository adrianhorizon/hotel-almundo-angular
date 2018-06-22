export class Hotels {

    amenities: {
      one: number;
      two: number;
      three: number;
      four: number;
    };
    _id? : number;
    name: string;
    stars: number;
    price: number;
    image: string;

    constructor(
      _id: number,
      name: string,
      stars: number,
      price: number,
      image: string,
    ) {
      this._id = _id;
      this.name = name;
      this.stars = stars;
      this.price = price;
      this.image = image;
    }

  }