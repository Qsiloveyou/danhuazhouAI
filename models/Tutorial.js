const mongoose = require('mongoose');

const TutorialSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
});

module.exports = mongoose.model('Tutorial', TutorialSchema);