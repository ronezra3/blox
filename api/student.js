var express = require('express');
var router = express.Router();


var studentsController = require("../controllers/student");


router.post('/student', (req, res) => {
    let newStudent = studentsController.create();
    res.json(newStudent);
});

router.get('/student', (req, res) => {
    let students = studentsController.getAll();
    res.json(students);
});

router.get('/student/:id', (req, res) => {
    let studentId = req.params.id;
    let students = studentsController.getById(studentId);
    res.json(students);
});

router.get('/student/name/:name', (req, res) => {
    let userName = req.params.name;
    let students = studentsController.getByName(userName);
    res.json(students);
});

router.get('/course/student/:courseId', (req, res) => {
    let courseId = req.params.courseId;
    let students = studentsController.getByCourse(courseId);
    res.json(students);
});

router.put('/student/:id', (req, res) => {
    let studentId = req.params.id;
    let updateItems = req.body;

    let studentResponse = studentsController.update(studentId, updateItems);
    if (studentResponse === 404) {
        res.status(404).send({ error: "Student not found" });
    }
    else {
        res.json(studentResponse);
    }

});

router.put('/student/:studentId/course/:courseId', (req, res) => {
    let studentId = req.params.studentId;
    let courseId = req.params.courseId;

    let studentResponse = studentsController.updateCourseSubscribe(studentId, courseId);
    if (studentResponse === 404) {
        res.status(404).send({ error: "Student not found" });
    }
    else if (studentResponse === 304) {
        res.status(304).send({ error: "Student already subscribed" });
    }
    else {
        res.json(studentResponse);
    }

});

router.put('/student/course/:courseId', (req, res) => {
    let courseId = req.params.courseId;

    studentsController.subscribeAllStudents(courseId);

    res.status(204)
});

router.put('/student/grade/:grade/:studentId/:courseId', (req, res) => {
    let studentId = req.params.studentId;
    let courseId = req.params.courseId;
    let grade = req.params.grade;
    let studentResponse = studentsController.updateGrade(studentId, courseId, grade);
    if(studentResponse === 404) {
        res.status(404).send({ error: "Student or course not found" });
    }
    else {
        res.json(studentResponse);
    }
    
});

module.exports = router;
