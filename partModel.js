var mongoose = require('mongoose');

var partModel = new mongoose.Schema({
    partNumber: {type: String, unique: true},
    description: {type: String},
    totalCurrentQuantity: {type: Number, default: 0},
    unitOfIssue: {type: String},
    costperUnit: {type: Number},
    totalCurrentCost: {type: Number},
    location: {type: String}
});

module.exports = mongoose.model('Parts', partModel);
