import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema({
  pertCPM: { type: Boolean, default: false },
  freeClean: { type: Boolean, default: false },
  busPermit: { type: Boolean, default: false },
  mayorPermit: { type: Boolean, default: false },
  bonds: { type: Boolean, default: false },
  cari: { type: Boolean, default: false },
});

const ContractSchema = new mongoose.Schema({
  contractID: { type: String, unique: true, required: true },
  projectName: { type: String, required: true },
  batch: { type: String },
  status: { type: String, required: true, default: "posted" },
  contractAmount: { type: Number },
  contractor: { type: String },
  // date
  posting: { type: Date },
  preBid: { type: Date },
  bidding: { type: Date },
  noa: { type: Date },
  ntp: { type: Date },
  contract: { type: Date },
  ntpRecieve: { type: Date },
  // document
  submittedDocuments: { type: DocumentSchema, default: () => ({}) },
  isDocComplete: { type: Boolean },
  lastUpdated: { type: Date, default: Date.now },
});

// Middleware to update lastUpdated and isDocComplete fields before saving the document
ContractSchema.pre('save', function (next) {
  this.lastUpdated = Date.now();
  if (this.submittedDocuments) {
    this.isDocComplete = Object.values(this.submittedDocuments).every(value => value === true);
  } else {
    this.isDocComplete = false;
  }
  // if (this.noa && this.ntp) {
  //   this.status = "proceed";
  // } else if (this.noa) {
  //   this.status = "awarded";
  // } else {
  //   this.status = "awarded"
  // }
  next();
});

// Middleware to update lastUpdated and isDocComplete fields before updating the document
ContractSchema.pre('findOneAndUpdate', function (next) {
  if (this._update.submittedDocuments) {
    this._update.isDocComplete = Object.values(this._update.submittedDocuments).every(value => value === true);
  } else {
    this._update.isDocComplete = false;
  }
  this._update.lastUpdated = Date.now();
  next();
});

export default mongoose.models.Contract || mongoose.model("Contract", ContractSchema);
