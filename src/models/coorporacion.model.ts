import mongoose, { Schema, Document } from 'mongoose';

interface ICorporation extends Document {
  name: string;
  city: string;
  department: string;
}

const CorporationSchema: Schema = new Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  department: { type: String, required: true },
});

export default mongoose.model<ICorporation>('Corporation', CorporationSchema);