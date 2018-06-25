export class Hotels {

    _id: string;
    name: string;
    stars: number;
    price: number;
    image: string;
    amenities: {
      one: string;
      two: string;
      three: string;
      four: string;
    };

    constructor(
      _id: string,
      name: string,
      stars: number,
      price: number,
      image: string,
      _amenities: {
        one: string;
        two: string;
        three: string;
        four: string;
      }
    ) {
      this._id = _id;
      this.name = name;
      this.stars = stars;
      this.price = price;
      this.image = image;
    }
  }