const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

const ObjectId = require('mongoose').Types.ObjectId;
 
// base path = http://localhost:3000/employees

// =================
// GET ALL TODOS
// =================
router.get('/' , (req,res) => {
    Employee.find((err ,  doc) => {
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
        const emp = await Employee.findById(id);
        res.send(emp)
    }
    else{
        res.status(400).send('Employee Not Found By Given Id' + id);
    }

});


// ======================
// ADD DATAT IN DATABASE
// ======================
router.post('/' , (req,res) => {
    const emp = new Employee ({
        todos:  req.body.todos,
        isDone:  req.body.isDone
    });
    emp.save( (err, doc) => {
        if(err){
            console.log(err);
        }else{
            res.status(200).json({code:200, message:'Todo Added Successfully', addEmployee:doc});
        }
    });
});

// ======================================
// GET Single  EMPLOYEE BY ID AND DELETE
// =====================================
router.delete('/:id' , async (req,res) => {
    const id = req.params.id;
    if(ObjectId.isValid(id)){
        const emp = await Employee.findByIdAndDelete(id);
        res.status(200).json({code:200, message:'Todo Deleted Successfully'});
    }
    else{
        res.status(400).send('Todo Not Found By Given Id' + id);
    }
});

// ======================
// UPDATE EMPLOYEE BY ID
// ======================
router.put('/:id' , async (req,res) => {
   
    const id = req.params.id;
    if(ObjectId.isValid(id)){
        const emp = (req.body);
        const empUpdate = await Employee.findByIdAndUpdate(id ,{$set:emp}, {new:true});
        res.status(200).json({code:200, message:'Todo Updated Successfully'});
    }
    else{
        res.status(400).send('Todo Not Found By Given Id' + id);
    }
});

// updateTodoisDoen
router.put('/isDoen/:id' , (req,res) => {
       
    const id = req.params.id;
    if(ObjectId.isValid(id)){
        const emp = (req.body);
        const empUpdate = await Employee.findByIdAndUpdate(id ,{$set:emp}, {new:true});
        res.status(200).json({code:200, message:'Todo Updated Successfully'});
    }
    else{
        res.status(400).send('Todo Not Found By Given Id' + id);
    }
})
module.exports = router;