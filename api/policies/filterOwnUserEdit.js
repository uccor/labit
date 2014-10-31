/**
 * Created by martin on 24/10/14.
 */


module.exports = function filterByUser(req, res, next) {
    if (typeof req.session.passport != 'undefined') {
        var userid = req.session.passport.user;
        // Si hay create agregar el UserId
        if (req.options.action == 'create') {
            req.body.id = userid;
        }
        if (req.options.action == 'update') {
            req.body.id = userid;
        }
        if (req.options.action == 'find') {
            if (req.query.where)
                req.query.where = '{"id": "' + userid + '" ,' + req.query.where.replace('{', '');
            else
                req.query.where = '{"id": "' + userid + '" }';
        }
    }

    return next();
}