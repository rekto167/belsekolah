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

router.post('/', upload.single('file'),  (req, res, next) => {
    if(req.file == undefined){
        return res.status(400).send({msg: 'Please upload a file'});
    }
    next();
},[
    check('name', 'Name is required').notEmpty()
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {name, file} = req.body;

    try {
        const bell = await Bells.findOne({name, file: req.file.path});
        if(bell){
            return res.status(409).json({msg: 'Bell already exists'});
        }
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

// @router  GET /api/bells/:id
// @desc    Get bell by id
// @access  public
router.get('/:id', async(req, res) => {
    try {
        const bell = await Bells.findById(req.params.id);
        res.json(bell);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;