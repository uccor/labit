/**
 * CourseController
 *
 * @description :: Server-side logic for managing Courses
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {


    get_my_courses : function (req, res) {

        var userID      =   req.session.passport.user;

        if(!userID){
            console.log('No existe un usuario Logueado');
            res.send('No existe un usuario Logueado');
            return;
        }

        User.findOne({id:userID}).populate('courses').exec(function findCB(err,found) {

            var userCourses = [];

            while (found.courses.length){
                userCourses.push(found.courses.pop());
            }


            if (req.isSocket) {
                Course.subscribe(req.socket, userCourses, ['update'], ['create'], ['destroy'], ['add'], ['remove']);
                Course.watch(req.socket);
            }

            return res.send(userCourses);
            });

        }

};

