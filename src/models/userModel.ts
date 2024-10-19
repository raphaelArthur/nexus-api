// src/models/userModel.ts
import mongoose, { Document, Schema } from 'mongoose';
import { Role } from '../enums/Role'; // Importa o enum de Role

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;  
  name: string;
  email: string;
  uf: string;
  city: string;
  address: string;
  geolocation: { latitude: number; longitude: number };
  gender: string;
  age: number;
  photo: string;
  race: string;
  schoolAccess: string;
  scholarity: string;
  organizationMembership: string;
  organizationCategory: string;
  password: string;
  role: Role;  // Usa o enum para a propriedade role
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },  // Email único
  uf: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  geolocation: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  race: { type: String, required: true },
  schoolAccess: { type: String, required: true },
  scholarity: { type: String, required: true },
  organizationMembership: { type: String, required: true },
  organizationCategory: { type: String, required: true },
  photo: { type: String, required: false },
  password: { type: String, required: true },
  role: { type: Number, enum: Role, required: true },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
