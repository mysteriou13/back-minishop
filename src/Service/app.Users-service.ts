import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { User, UserDocument } from "../schemas/user.schema";

const bcrypt = require('bcrypt');
const saltRounds = 10;
type Data = {
  name: string;
  value: string;
};

let databack: { [key: string]: string } = {};


@Injectable()
export class AppService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {
  }

  async getInscription(body: Data[]) {
    body.map((data: Data) => {
      if (data.name === 'password') {
        data.value = bcrypt.hashSync(data.value, saltRounds);
      }
      databack[data.name] = data.value;
    });
    let existingUser = await this.userModel.findOne({ email: databack.email });
    if (existingUser) {
      return [{ inscriptionStatus: false }];
    } else {

      await this.userModel.create(databack);
      return [{ inscriptionStatus: true }];
    }
  }


  getConnexion(body: Data[]): string {
    console.log('connection service connection', body); // Affiche les données reçues dans la console
    return 'connection Hello World!';
  }
}
