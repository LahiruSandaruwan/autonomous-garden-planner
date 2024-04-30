const mongoose = require('mongoose');
const { Schema } = mongoose;

const climateDataSchema = new Schema({
  date: { type: Date, required: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  temperature: { type: Number, required: true },
  precipitation: { type: Number, required: true },
  humidity: { type: Number, required: true },
  uvIndex: { type: Number, required: true },
  gardenId: { type: Schema.Types.ObjectId, ref: 'Garden' }
});

const ClimateData = mongoose.model('ClimateData', climateDataSchema);

module.exports = ClimateData;
