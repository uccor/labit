/**
 * Live_class_studentController
 *
 * @description :: Server-side logic for managing live_class_students
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    unsubscribe: function (req, res) {

        var id = req.param('id');
        Live_class_student.find().exec(function(err, Live_class_student_Instance) {
            Live_class_student.unsubscribe(req.socket, Live_class_student_Instance);
            return res.send(Live_class_student_Instance);
        });

}
	
};

