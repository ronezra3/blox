coursesStore = [];

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

    getAll() {
        return coursesStore;
    },

    getById(courseId) {
        let currentCourse = courseStore.find(course => course.id === coursetId)
        return currentCourse;
    },

    update(courseId, updateItems) {
        let currentCourse = coursesStore.find(course => course.id === courseId);

        if (currentStudent) {
            Object.assign(currentStudent, updateItems)
            return currentStudent;
        }
        else {
            return "Not found" //TODO
        }

    },

    delete(courseId) {

        coursesStore = coursesStore.filter(course => course.id !== courseId);

        return coursesStore;
    },

    create() {
        let newCourse = { id: coursesStore.length.toString(36) }
        coursesStore.push(newCourse);
        return newCourse;
    }

}