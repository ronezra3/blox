var express = require('express');
var router = express.Router();

var coursesController = require("../controllers/courses");

router.get('/course', (req, res) => {

    let course = coursesController.getAll();
    
    res.json(courses);
});

router.get('/course/:id', (req, res) => {
    let courseId = req.params.id;

    let course = coursesController.update(courseId);
    
    res.json(courses);
});

router.put('/course/:id', (req, res) => {
    let courseId = req.params.id;
    let updateItems = req.body;

    let course = coursesController.update(courseId, updateItems);
    
    res.json(courses);
});

router.delete('/course/:id', (req, res) => {
    let courseId = req.params.id;
    let course = coursesController.delete(courseId);
    res.json(courses);
});

router.post('/course', (req, res) => {
    let newCourse = coursesController.create();
    res.json(newCourse);
});

module.exports = router;