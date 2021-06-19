const mongoose = require('mongoose');

const Task = mongoose.model ('Task' , {
    todos: {type: String},
    isDone:{type:Boolean}
})

module.exports = Task;