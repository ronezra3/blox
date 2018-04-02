var express = require('express');
var router = express.Router();


var model = require("../models/index");


router.post('/student', model.student.create);

router.get('/student', model.student.getAll);

router.get('/student/:id', model.student.getById);

router.get('/student/name/:name', model.student.getByName);

router.get('/course/student/:courseId', model.student.getByCourse);

router.put('/student/:id', model.student.update);

router.put('/student/course/:userId/:courseId', model.student.updateCourseSubscribe);

router.put('/student/course/:courseId', model.student.subscribeAllStudents);

router.put('/student/grade/:grade/:userId/:courseId', model.student.updateGrade);

router.delete('/student/:id', model.student.delete);


module.exports = router;
