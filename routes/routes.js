const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');
const ObjectId = require('mongoose').Types.ObjectId;
const mongojs = require('mongoose');

 
// base path = http://localhost:3000/Todos

// =================
// GET ALL TODOS
// =================
router.get('/' , (req,res) => {
    Todo.find((err ,  doc) => {
        if(err){
            console.log(err);
        }else{
            res.send(doc);
        }
    });
});

// ===========================
// GET Single  Todo BY ID
// ==========================
router.get('/:id' , async (req,res) => {
    const id = req.params.id;
    if(ObjectId.isValid(id)){
        const emp = await Todo.findById(id);
        res.send(emp)
    }
    else{
        res.status(400).send('Todo Not Found By Given Id' + id);
    }

});


// ======================
// ADD DATAT IN DATABASE
// ======================
router.post('/' , (req,res) => {
    const emp = new Todo ({
        title:  req.body.title,
        isDone:  req.body.isDone
    });
    emp.save( (err, doc) => {
        if(err){
            console.log(err);
        }else{
            res.status(200).json({code:200, message:'Todo Added Successfully', addTodo:doc});
        }
    });
});

// ======================================
// GET Single  Todo BY ID AND DELETE
// =====================================
router.delete('/:id' , async (req,res) => {
    const id = req.params.id;
    if(ObjectId.isValid(id)){
        const emp = await Todo.findByIdAndDelete(id);
        res.status(200).json({code:200, message:'Todo Deleted Successfully'});
    }
    else{
        res.status(400).send('Todo Not Found By Given Id' + id);
    }
});

// ======================
// UPDATE Todo BY ID
// ======================
router.put('/:id' , async (req,res) => {
    const id = req.params.id;
    if(ObjectId.isValid(id)){
        const todo = (req.body);
        const todoUpdate = await Todo.findByIdAndUpdate(id ,{$set:todo}, {new:true});
        res.status(200).json({code:200, message:'Todo Updated Successfully'});
    }
    else{
        res.status(400).send('Todo Not Found By Given Id' + id);
    }
});



module.exports = router;






// Update Task
// router.put('/:id', function(req, res, next){
//     var task = req.body;
//     const id = req.params.id;
//     var updTask = {};
    
//     if(task.isDone){
//         updTask.isDone = task.isDone;
//     }
    
//     if(task.title){
//         updTask.title = task.title;
//     }
    
//     if(!updTask){
//         res.status(400);
//         res.json({
//             "error":"Bad Data"
//         });
//     } else {
//         Todo.findByIdAndUpdate({_id:(id)},updTask, {}, function(err, task){
//         if(err){
//             res.send(err);
//         }
//         res.json(task);
//     });
//     }
// });