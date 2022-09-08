const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  { 
    id:{ type: String,required:true},
    image: { type: String },
    brand: { type: String },
    category: { type: String },
    
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const profile = mongoose.model("profile", profileSchema);

module.exports = profile;
