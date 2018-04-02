var express = require('express');
var router = express.Router();

var model = require("../models/index");


router.get('/course', model.courses.getAll);

router.get('/course/:id', model.courses.getById);

router.put('/course/:id', model.courses.update);

router.delete('/course/:id', model.courses.delete);

router.post('/course', model.courses.create);

module.exports = router;