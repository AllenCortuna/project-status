import mongoose from 'mongoose';

const ContractSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Contract || mongoose.model('Contract', ContractSchema);
