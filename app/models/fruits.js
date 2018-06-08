let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let FruitSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Fruit required']
    },
    count: {
        type: Number,
        min: [
            1, 'Too few fruits'
        ],
        required: true
    }
});

module.exports = mongoose.model('fruit', FruitSchema);