import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
/*user FrontMinishop*/
export class User {
    @Prop({ required: true, trim: true, lowercase: true, unique: true })
    email!: string;  

    @Prop({ required: true, minlength: 4 })
    password!: string;

    @Prop({ required: true, trim: true })
    nom!: string;

    @Prop({ required: true, trim: true })
    prenom!: string;

    @Prop({ required: true, trim: true })
    adress!: string;

    @Prop({ required: true, trim: true, alias: 'complement adress' })
    complement_adress!: string;

    @Prop({ required: true, trim: true })
    ville!: string;

    @Prop({ required: true, trim: true, alias: 'code postal' })
    code_postal!: string;

    @Prop({ required: true, trim: true })
    pays!: string;

    @Prop({ required: true, trim: true })
    region!: string;

}


export const UserSchema = SchemaFactory.createForClass(User);