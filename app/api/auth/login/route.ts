// pages/api/auth/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      await mongoose.connect(process.env.MONGODB_URI || '', {
        bufferCommands: false,
        dbName: 'myapp',
      });

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ message: 'Email o contraseña incorrectos' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Email o contraseña incorrectos' });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || '', {
        expiresIn: '1h',
      });

      return res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error en el servidor' });
    } finally {
      mongoose.disconnect();
    }
  } else {
    return res.status(405).json({ message: 'Método no permitido' });
  }
}