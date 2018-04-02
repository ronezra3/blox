student = [];

function responseHandler(res, dataItem, status) {
    if (status) {
        res.sendStatus(status);
    }
    else if ((Array.isArray(dataItem) && dataItem.length) || (!Array.isArray(dataItem) && dataItem)) {
        res.json(dataItem);
    }
    else {
        res.sendStatus(404);//.send("Item not found");
    }
}

module.exports = {

    getAll(req, res) {
        responseHandler(res, student)
    },

    getById(req, res) {
        let id = req.params.id;
        let currentStudent = student.find(current => current.id === id)
        responseHandler(res, currentStudent);
    },

    getByName(req, res) {
        let name = req.params.name;

        let currentStudents = student.reduce(function (arr, element) {
            if (element.name === name)
                arr.push(element);
            return arr;
        }, []);

        responseHandler(res, currentStudents);
    },

    getByCourse(req, res) {
        let courseId = req.params.courseId;
        // students.find( facet => facet.id===id ),

        let currentStudents = student.reduce(function (arr, element) {
            if (element.courses.find(current => current.id === courseId))
                arr.push(element);
            return arr;
        }, []);

        responseHandler(res, currentStudents);

    },

    update(req, res) {
        let id = req.params.id;
        let updateItems = req.body;

        let currentStudent = student.find(current => current.id === id);
        let index = student.indexOf(currentStudent);

        if (~index) {
            Object.keys(updateItems).forEach(key => {
                currentStudent[key] = updateItems[key];
            })
            student[index] = currentStudent;
            responseHandler(res, currentStudent, 204);
        }
        else {
            responseHandler(res, undefined, 404);
        }

    },

    updateCourseSubscribe(req, res) {
        let userId = req.params.userId;
        let courseId = req.params.courseId;

        let currentStudent = student.find(current => current.id === userId);
        let studentIndex = student.indexOf(currentStudent);

        if (~studentIndex) {
            if (!currentStudent.courses.find(current => current.id === courseId)) {
                currentStudent.courses.push({
                    id: courseId,
                    grade: 0
                })
                student[studentIndex] = currentStudent;
                responseHandler(res, currentStudent, 204);
            }
            else {
                responseHandler(res, currentStudent, 304);
            }
        }
        else {
            responseHandler(res, undefined, 404);
        }

    },

    subscribeAllStudents(req, res) {
        let courseId = req.params.courseId;

        student.forEach(currentStudent => {
            if (!currentStudent.courses.find(course => course.id === courseId)) {
                currentStudent.courses.push({
                    id: courseId,
                    grade: 0
                })
            }
        })
        responseHandler(res, {}, 204);

    },

    updateGrade(req, res) {
        let userId = req.params.userId;
        let courseId = req.params.courseId;
        let grade = req.params.grade;

        let currentStudent = student.find(current => current.id === userId);
        let studentIndex = student.indexOf(currentStudent);

        if (~studentIndex) {
            let currentCourse = currentStudent.courses.find(current => current.id === courseId);
            let courseIndex = currentStudent.courses.indexOf(currentCourse);

            if (~courseIndex) {
                let currentCourse = courses[courseIndex];
                currentCourse.grade = grade;
                currentStudent.courses[courseIndex] = currentCourse;
                student[studentIndex] = currentStudent;
                responseHandler(res, currentStudent, 204);
            }
            else {
                responseHandler(res, undefined, 404);
            }
        }
        else {
            responseHandler(res, undefined, 404);
        }

    },

    delete(req, res) {
        let id = req.params.id;

        let currentStudent = student.find(current => current.id === id)
        let index = student.indexOf(currentStudent);

        if (~index) {
            student.splice(index, 1);
            responseHandler(res, {}, 204);
        }
        else {
            responseHandler(res, undefined, 404);
        }
    },

    create(req, res) {
        let currentStudent = {
            id: student.length.toString(36),
            courses: []
        }
        student.push(currentStudent);

        responseHandler(res, currentStudent, 204);
    }

}