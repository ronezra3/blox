var express = require('express');
var router = express.Router();


router.use('/', require("./student"));
router.use('/', require("./course"));


module.exports = router;

