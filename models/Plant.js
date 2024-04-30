const mongoose = require('mongoose');
const { Schema } = mongoose;

const plantSchema = new Schema({
  commonName: { type: String, required: true },
  scientificName: { type: String, required: true },
  plantingZone: { type: String, required: true },
  sunlightRequirements: { type: String, required: true },
  wateringRequirements: { type: String, required: true },
  plantingSeason: { type: String, required: true },
  harvestTime: { type: String, required: true },
  gardenId: { type: Schema.Types.ObjectId, ref: 'Garden' }
});

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;
