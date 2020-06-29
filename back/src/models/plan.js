const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const PlanSchema = new mongoose.Schema({
    compte: { type: String, required: true },
    lib: { type: String, required: true },

}, {
    timestamps: true
});

PlanSchema.plugin(beautifyUnique, {
    defaultMessage: "Une erreur c\'est produite: "
});


module.exports = mongoose.model('Plan', PlanSchema);