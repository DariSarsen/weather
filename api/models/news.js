const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: String, required: true },
    imageUrls: [{ type: String, required: true }]
});

const news = mongoose.model('News', newsSchema);

module.exports = news;
