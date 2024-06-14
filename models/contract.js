import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema({
  pertCPM: { type: Boolean },
  freeClean: { type: Boolean },
  busPermit: { type: Boolean },
  mayorPermit: { type: Boolean },
  bonds: { type: Boolean },
  cari: { type: Boolean },
});

const DateSchema = new mongoose.Schema({
  itb: { type: Date },
  preBid: { type: Date },
  bidding: { type: Date },
  noa: { type: Date },
  ntp: { type: Date },
  contract: { type: Date },
  ntpRecieve: { type: Date },
});

const ContractSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: { type: String, required: true },
  batch: { type: String, required: true },
  contractAmount: { type: Number },
  contractor: { type: String },
  date: { type: DateSchema },
  submittedDocuments: { type: DocumentSchema },
});

export default mongoose.models.Contract ||
  mongoose.model("Contract", ContractSchema);
