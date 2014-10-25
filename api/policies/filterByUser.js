/**
 * Created by martin on 24/10/14.
 */


module.exports = function filterByUser(req, res, next) {

    var userid = req.session.passport.user;
    if (userid) {
        // Si hay create agregar el UserId
        if (req.options.action == 'create') {
            req.body.createdBy = userid;
        }
        if (req.options.action == 'find') {
        }
        if (req.query.where)
            req.query.where = '{"createdBy": "' + userid + '" ,' + req.query.where.replace('{','');
        else
            req.query.where = '{"createdBy": "' + userid + '" }';
    }

    return next();
}