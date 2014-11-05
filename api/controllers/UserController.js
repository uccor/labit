/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    redirectHomeByRole: function (req, res) {
        var user = req.user;

        if (user) {
            user_role = user.role;
            if (user_role == "student") {
                console.log("student");
                return res.view('student');

            } else if (user_role == "professor") {
                console.log("prof");
                return res.view('professorCourse');
            }
        }
        else {
            res.redirect('/login');
        }
    },

    getUser: function (req, res) {
        if (typeof req.session.passport != 'undefined') {
            var user = req.session.passport.user;
            return res.json({
                'userId': user});

        }
        return res.view('index');
    }
};
