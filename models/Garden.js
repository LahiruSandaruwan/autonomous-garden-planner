const mongoose = require('mongoose');
const { Schema } = mongoose;

const gardenSchema = new Schema({
  name: { type: String, required: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  size: { type: Number, required: true },
  soilType: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Garden = mongoose.model('Garden', gardenSchema);

module.exports = Garden;
