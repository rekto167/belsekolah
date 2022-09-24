const express = require('express');
const Bells = require('../../models/Bells');
const router = express.Router();

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

// @router  POST /api/bells
// @desc    Add bells
// @access  public
router.post('/', async(req, res) => {

});

module.exports = router;