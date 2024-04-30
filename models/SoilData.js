const mongoose = require('mongoose');
const { Schema } = mongoose;

const soilDataSchema = new Schema({
  date: { type: Date, required: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  pHLevel: { type: Number, required: true },
  nutrientContent: {
    nitrogen: { type: Number, required: true },
    phosphorus: { type: Number, required: true },
    potassium: { type: Number, required: true }
  },
  moistureContent: { type: Number, required: true },
  gardenId: { type: Schema.Types.ObjectId, ref: 'Garden' }
});

const SoilData = mongoose.model('SoilData', soilDataSchema);

module.exports = SoilData;
