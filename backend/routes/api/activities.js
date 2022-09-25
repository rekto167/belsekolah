const express = require('express');
const {check, validationResult} = require("express-validator");
const router = express.Router();

const Activities = require('../../models/Activities');

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

module.exports = router;