coursesStore = require('../stores/coursesStore');

module.exports = {

    getAll() {
        return coursesStore;
    },

    getById(courseId) {
        let currentCourse = coursesStore.find(course => course.id === courseId)
        return currentCourse;
    },

    update(courseId, updateItems) {
        let currentCourse = coursesStore.find(course => course.id === courseId);

        if (currentCourse) {
            Object.assign(currentCourse, updateItems)
            return currentCourse;
        }
        else {
            return 404;
        }

    },

    delete(courseId) {

        coursesStore = coursesStore.filter(course => course.id !== courseId);

        return 204;
    },

    create() {
        let newCourse = { id: coursesStore.length.toString(36) }
        coursesStore.push(newCourse);
        return newCourse;
    }

}