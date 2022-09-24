const express = require('express');
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './resources/audio/upload/');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});
const upload = multer({storage: storage});
const { check, validationResult } = require('express-validator');

const Bells = require('../../models/Bells');

// @router  POST /api/bells
// @desc    Add bells
// @access  public

router.post('/', upload.single('file'), [
    check('name', 'Name is required').notEmpty()
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {name, file} = req.body;

    try {
        const addBell = new Bells({
            name: name,
            file: req.file.path
        });

        await addBell.save();

        res.json(addBell);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

// @router  GET /api/bells
// @desc    Get all bells
// @access  public
router.get('/', async(req, res) => {
    try {
        const bells = await Bells.find();
        if(bells.length == 0){
            return res.status(404).json({msg: 'Not yet'});
        }
        res.json(bells);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;