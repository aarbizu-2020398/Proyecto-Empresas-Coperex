import mongoose from 'mongoose';

const EmpresaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  nivelImpacto: { type: String, required: true },
  aniosTrayectoria: { type: Number, required: true },
  categoria: { type: String },
  imagen: { type: String }
}, {
  timestamps: true
});

export default mongoose.model('Empresa', EmpresaSchema);
