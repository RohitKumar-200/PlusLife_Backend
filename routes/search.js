const express = require('express');
const router = express.Router();
const Docotrs = require('../models/doctors');
const verify = require('./verifyToken');

router.use(verify);

router.post('/', async (req, res)=>{
    try {
        let searchStr = '';
        if(req.body.searchStr) {
            searchStr = req.body.searchStr.toLowerCase();
        }
        const doctors = await Docotrs.find();
        const result = doctors.filter((character) => {
            return (
                character.name.toLowerCase().includes(searchStr) ||
                character.email.toLowerCase().includes(searchStr) ||
                character.degree.toLowerCase().includes(searchStr) ||
                character.specialization.toLowerCase().includes(searchStr) ||
                character.about.toLowerCase().includes(searchStr) ||
                character.name.toLowerCase().includes(searchStr)
            );
        });
        res.json({searchList: result});
    } catch(err) {
        res.status(400).json({"errorMessage": err});
    }
});

module.exports = router;