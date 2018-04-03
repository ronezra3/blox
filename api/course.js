var express = require('express');
var router = express.Router();

var coursesController = require("../controllers/courses");

router.get('/course', (req, res) => {

    let course = coursesController.getAll();

    res.json(courses);
});

router.get('/course/:id', (req, res) => {
    let courseId = req.params.id;

    let courseResponse = coursesController.getById(courseId);
    if (courseResponse) {
        res.json(courseResponse);
    }
    else {
        res.status(404).send({ error: "Course not found" });
    }

});

router.put('/course/:id', (req, res) => {
    let courseId = req.params.id;
    let updateItems = req.body;

    let courseResponse = coursesController.update(courseId, updateItems);

    if (courseResponse === 404) {
        res.status(404).send({ error: "Course not found" });
    }
    else {
        res.json(courseResponse);
    }

});

router.delete('/course/:id', (req, res) => {
    let courseId = req.params.id;
    let course = coursesController.delete(courseId);
    res.status(204)
});

router.post('/course', (req, res) => {
    let newCourse = coursesController.create();
    res.json(newCourse);
});

module.exports = router;