studentsStore = [];

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
    create() {
        let currentStudent = {
            id: studentsStore.length.toString(36),
            courses: []
        }
        studentsStore.push(currentStudent);

        return currentStudent;
    },

    getAll() {
        return studentsStore;
    },

    getById(studentId) {
        let currentStudent = studentsStore.find(current => current.id === studentId)
        return currentStudent;
    },

    getByName(userName) {
        let students = studentsStore.filter(student => student.name === userName);
        return students;
    },

    getByCourse(courseId) {
        let students = studentsStore.filter(student => {
            student.courses.find(course => course.id === courseId)
        });

        return students;
    },

    update(studentId, updateItems) {
        let currentStudent = studentsStore.find(student => student.id === studentId);

        if (currentStudent) {
            Object.assign(currentStudent, updateItems)
            return currentStudent;
        }
        else {
            return "Not found" //TODO
        }

    },

    updateCourseSubscribe(studentId, courseId) {


        let currentStudent = studentsStore.find(student => student.id === studentId);

        if (currentStudent) {
            if (!currentStudent.courses.find(current => current.id === courseId)) {
                currentStudent.courses.push({
                    id: courseId,
                    grade: 0
                })
                return currentStudent;
            }
            else {
                return "Exist" //TODO
            }
        }
        else {
            return "Not found" //TODO
        }

    },

    subscribeAllStudents(courseId) {
        studentsStore.forEach(currentStudent => {
            if (!currentStudent.courses.find(course => course.id === courseId)) {
                currentStudent.courses.push({
                    id: courseId,
                    grade: 0
                })
            }
        })
        return "Update" //TODO

    },

    updateGrade(studentId, courseId, grade) {

        let currentStudent = studentsStore.find(student => student.id === studentId);

        if (currentStudent) {
            let currentCourse = currentStudent.courses.find(current => current.id === courseId);

            if (currentCourse) {
                currentCourse.grade = grade;
                return currentStudent;
            }
            else {
                return "Course not found" //TODO
            }
        }
        else {
            return "User not found" //TODO
        }

    },

    delete(userId) {
        studentsStore = studentsStore.filter(student => student.id !== userId);
        return studentsStore;
    }

}

