import  {Schema, model, models} from 'mongoose';

// Esquema de usuario
const funcionarioSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  identificacion: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  direccion: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: {
        values: ['admin','conc', 'super-user','miembro'],
        message: '{VALUE} no es un role válido',
        default: 'miembro',
        required: true
    }
}
}, { timestamps: true });

// Modelo de usuario
const Funcionario = models.Funcionario || model('Funcionario', funcionarioSchema);

module.exports = Funcionario;