import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from "mongoose";
import {User, UserDocument} from "./schemas/user.schema";

type FormField = {
  name: string;
  value: string;
};

@Injectable()
export class AppService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ){
  }

  async getInscription(body: unknown){
    console.log('inscription service inscription',body); // Affiche les données reçues dans la console

    const fieldMap: Record<string, keyof User> = {
      email: 'email',
      password: 'password',
      nom: 'nom',
      prenom: 'prenom',
      adress: 'adress',
      'complement adress': 'complement_adress',
      ville: 'ville',
      'code postal': 'code_postal',
      pays: 'pays',
      region: 'region',
    };

    const fields = this.extractFormFields(body);
    if (!fields.length) {
      throw new BadRequestException('Payload inscription invalide: aucun champ recu');
    }

    const normalizedUser = fields.reduce((acc, field) => {
      const key = fieldMap[field.name.trim().toLowerCase()];
      if (key) {
        acc[key] = String(field.value ?? '');
      }
      return acc;
    }, {} as Partial<Record<keyof User, string>>);

    const createdUser = new this.userModel(normalizedUser);
  /*verif user exist*/
    const existingUser = this.userModel.findOne({ email: normalizedUser.email }).exec();
    if (await existingUser) {
      throw new BadRequestException('Un utilisateur avec cet email existe déjà');
    }else {
    createdUser.save();
    }
}

  private extractFormFields(payload: unknown): FormField[] {
    if (Array.isArray(payload)) {
      return payload.filter(
        (item): item is FormField =>
          !!item && typeof item === 'object' && 'name' in item && 'value' in item,
      );
    }

    if (payload && typeof payload === 'object') {
      const source = payload as Record<string, unknown>;

      if (Array.isArray(source.data)) {
        return this.extractFormFields(source.data);
      }

      if (Array.isArray(source.fields)) {
        return this.extractFormFields(source.fields);
      }

      return Object.entries(source).map(([name, value]) => ({
        name,
        value: String(value ?? ''),
      }));
    }

    return [];
  }

  getConnexion(body: [][]): string {
    console.log('connection service connection',body); // Affiche les données reçues dans la console
    return 'connection Hello World!';
  }
}
