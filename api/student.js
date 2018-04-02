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

    let student = studentsController.update(studentId, updateItems);
    res.json(student);
});

router.put('/student/:studentId/course/:courseId', (req, res) => {
    let studentId = req.params.studentId;
    let courseId = req.params.courseId;

    let student = studentsController.updateCourseSubscribe(studentId, courseId);

    res.json(student);
});

router.put('/student/course/:courseId', (req, res) => {
    let courseId = req.params.courseId;

    let student = studentsController.subscribeAllStudents(courseId);

    res.json(student);
});

router.put('/student/grade/:grade/:studentId/:courseId', (req, res) => {
    let studentId = req.params.studentId;
    let courseId = req.params.courseId;
    let grade = req.params.grade;
    let student = studentsController.updateGrade(studentId, courseId, grade);

    res.json(student);
});

router.delete('/student/:id', (req, res) => {
    let userId = req.params.id;

    let student = studentsController.delete(userId); //TODO

    res.json(student); //TODO
});


module.exports = router;
