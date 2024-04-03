import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    identificacion:{
        type: String,
        unique: true,
        required: [true, "La identificación es requerida"],
        minLength: [6, "La identificación debe tener al menos 6 caracteres"],
        maxLength: [11, "La identificación debe tener como máximo 11 caracteres"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "El email no es valido",
      ],
    },
    password: {
      type: String,
      required: [true, "La contraseña es requerida"],
      select: false,
    },
    fullname: {
      type: String,
      required: [true, "El nombre es requerido"],
      minLength: [3, "El nombre debe tener al menos 3 caracteres"],
      maxLength: [20, "El nombre debe tener como máximo 20 caracteres"],
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", UserSchema);
export default User;