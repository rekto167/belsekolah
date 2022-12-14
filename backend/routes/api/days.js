const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');

const Days = require('../../models/Days');

// @router  POST api/days
// @desc    Add day
// @access  Public
router.post('/', [
    check('name', 'Name is required').notEmpty()
],async(req, res)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {name} = req.body;
    try {
        const day = await Days.findOne({name});
        if(day){
            return res.status(400).json({
                errors: [
                    {
                        msg: 'Day was already exist'
                    }
                ]
            });
        }

        const addday = new Days({
            'name': name
        });

        addday.save();

        res.json(addday);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// @router  GET api/days
// @desc    Get all day
// @access  Public
router.get('/', async(req, res) => {
    try {
        const days = await Days.find();
        res.json(days);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @router  DELETE api/days
// @desc    Delete day
// @access  Public
router.delete('/:id', async(req, res) => {
    try {
        const day = await Days.findById(req.params.id);
        await day.remove();

        res.json({msg: 'Day was deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @router  PUT api/days
// @desc    Edit day
// @access  Public
router.put('/:id', async(req, res)=> {
    try {
        const day = await Days.findById(req.params.id);
        day.name = req.body.name;
        await day.save();
        res.json({
            msg: 'Data updated successfully',
            data: day
        })
    } catch (err) {
        console.error(err.message);
        res.status(500)
    }
});

module.exports = router;