courses = [];

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

    getById(req, res) {
        let id = req.params.id;

        let currentCourses = courses.find(current => current.id === id)
        responseHandler(res, currentCourses);
    },

    getAll(req, res) {
        responseHandler(res, courses);
    },

    update(req, res) {

        let id = req.params.id;
        let updateItems = req.body;

        let currentCourses = courses.find(current => current.id === id);
        let index = courses.indexOf(currentCourses);

        if (~index) {
            Object.keys(updateItems).forEach(key => {
                currentCourses[key] = updateItems[key];
            })
            courses[index] = currentCourses;
            responseHandler(res, currentCourses, 204);
        }
        else {
            responseHandler(res, undefined, 404);
        }

    },

    delete(req, res) {
        let id = req.params.id;

        let currentCourse = courses.find(current => current.id === id)
        let index = courses.indexOf(currentCourse);

        if (~index) {
            courses.splice(index, 1);
            responseHandler(res, currentCourse, 204);
        }
        else {
            responseHandler(res, undefined, 404);
        }
    },

    create(req, res) {
        courses.push({ id: courses.length.toString(36) });
        responseHandler(res, {}, 204);
    }

}