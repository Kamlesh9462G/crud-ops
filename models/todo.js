const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    task: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

var Todos = mongoose.model('Todo', todoSchema);

module.exports = Todos;