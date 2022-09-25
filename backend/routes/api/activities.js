const express = require('express');
const {check, validationResult} = require("express-validator");
const router = express.Router();

const Activities = require('../../models/Activities');

//@route    GET /api/activities
//@desc     Get activities
//@access   Public
router.get('/', async(req, res) => {
   try{
       const activities = await Activities.find();
       res.json(activities);
   } catch (err){
       console.error(err.message);
       res.status(500).send('Server error');
   }
});

//@route    POST /api/activities
//@desc     Add activities
//@access   Public
router.post('/', [
    check('name', 'Name is required').notEmpty(),
    check('bell', 'You have choice your bell').notEmpty()
],async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {name, bell} = req.body;
   try{
        const newData = new Activities({
            name,
            bell
        });

        await newData.save();
        res.json({
            data: newData,
            msg: 'Add data successfully'
        });
   } catch (err){
       console.error(err.message);
       res.status(500).send('Server error');
   }
});

//@route    GET /api/activities/:id
//@desc     Get activity by Id
//@access   Public
router.get('/:id', async(req, res) => {
   try {
       const activity = await Activities.findById(req.params.id);
       res.json(activity);
   } catch (err){
       console.error(err.message);
       res.status(500).send('Server error');
   }
});

//@route    PUT /api/activities/:id
//@desc     Edit activity
//@access   Public
router.put('/:id', [
    check('name', 'Name is required').notEmpty(),
    check('bell', 'Bell is required').notEmpty(),
],async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const newValue = {
            name: req.body.name,
            bell: req.body.bell
        };
        const activity = await Activities.findByIdAndUpdate(req.params.id, newValue);
        res.json({data: activity, msg: 'Updated successfully'});
    }catch (e) {
        console.error(e.message);
        res.status(500).send('Server error');
    }
});

//@route    DELETE /api/activities/:id
//@desc     Edit activity
//@access   Public
router.delete('/:id', async(req, res)=>{
   try {
       const activity = await Activities.findByIdAndRemove(req.params.id);
       res.json({
           data: activity,
           msg: 'Delete data successfully'
       });
   } catch(err){
       console.error(err.message);
       res.status(500).send('Server error');
   }
});


module.exports = router;