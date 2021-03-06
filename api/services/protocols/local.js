﻿var validator = require('validator');

/**
 * Local Authentication Protocol
 *
 * The most widely used way for websites to authenticate users is via a username
 * and/or email as well as a password. This module provides functions both for
 * registering entirely new users, assigning passwords to already registered
 * users and validating login requesting.
 *
 * For more information on local authentication in Passport.js, check out:
 * http://passportjs.org/guide/username-password/
 */

/**
 * Register a new user
 *
 * This method creates a new user from a specified email, username and password
 * and assign the newly created user a local Passport.
 *
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */
exports.register = function (req, res, next) {
  var name = req.param('name')
    , lastName = req.param ('lastName')
    , email    = req.param('email')
    , username = req.param('username')
    , password = req.param('password')
    , password2 = req.param('password2')
    , role = req.param('role')


     console.log('LOCAAAAAAAAAAAAAAAAAL')

    // console.log(password)

  if (password!=password2){
      // console.log("Passwords don't match")
      // registrarionmessage = "NO COINCIDE CONTRASEÑA"
      req.flash('error', 'Error, la contraseña no coincide');
      // req.setAttribute('registrationerror', "")

      /*
      res.render('error', {title: 'Register', error: 'Email and password required.'});
      res.render ('/register', {errorMessages: 'NOOOO COINCIDE PASSSWOOOORD'});
      */
      return next(new Error('Password do not match.'));
  }
  if (!email) {
    req.flash('error', 'Error Email no especificado');
    return next(new Error('No email was entered.'));
  }

  if (!username) {
    req.flash('error', 'Username No Especificado');
    return next(new Error('No username was entered.'));
  }

  if (!password) {
    req.flash('error', 'Contrasenia Incorrecta');
    return next(new Error('No password was entered.'));
  }

  User.create({
    username : username
  , email    : email
  , role : role
  , name : name
  , lastName : lastName
  }, function (err, user) {
    if (err) {
      if (err.code === 'E_VALIDATION') {
        if (err.invalidAttributes.email) {
          req.flash('error', 'Error email ya existente');
        } else {
          req.flash('error', 'Error username ya existe');
        }
      }
      
      return next(err);
    }

    Passport.create({
      protocol : 'local'
    , password : password
    , user     : user.id
    }, function (err, passport) {
      if (err) {
        if (err.code === 'E_VALIDATION') {
          req.flash('error', 'Error Passport Invalid');
        }
        
        return user.destroy(function (destroyErr) {
          next(destroyErr || err);
        });
      }

      next(null, user);
    });
  });
};

/**
 * Assign local Passport to user
 *
 * This function can be used to assign a local Passport to a user who doens't
 * have one already. This would be the case if the user registered using a
 * third-party service and therefore never set a password.
 *
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */
exports.connect = function (req, res, next) {
  var user     = req.user
    , password = req.param('password');

  Passport.findOne({
    protocol : 'local'
  , user     : user.id
  }, function (err, passport) {
    if (err) {
      return next(err);
    }

    if (!passport) {
      Passport.create({
        protocol : 'local'
      , password : password
      , user     : user.id
      }, function (err, passport) {
        next(err, user);
      });
    }
    else {
      next(null, user);
    }
  });
};

/**
 * Validate a login request
 *
 * Looks up a user using the supplied identifier (email or username) and then
 * attempts to find a local Passport associated with the user. If a Passport is
 * found, its password is checked against the password supplied in the form.
 *
 * @param {Object}   req
 * @param {string}   identifier
 * @param {string}   password
 * @param {Function} next
 */
exports.login = function (req, identifier, password, next) {
  var isEmail = validator.isEmail(identifier)
    , query   = {};

  if (isEmail) {
    query.email = identifier;
  }
  else {
    query.username = identifier;
  }

  User.findOne(query, function (err, user) {
    if (err) {
      return next(err);
    }

    if (!user) {
      if (isEmail) {
        req.flash('error', 'Error email not found');
        // console.log("Error.Passport.Email.NotFound")
      } else {
        req.flash('error', 'Error password not found');
        // console.log("Error.Passport.Username.NotFound")

      }

      return next(null, false);
    }

    Passport.findOne({
      protocol : 'local'
    , user     : user.id
    }, function (err, passport) {
      if (passport) {
        passport.validatePassword(password, function (err, res) {
          if (err) {
            return next(err);
          }

          if (!res) {
            req.flash('error', 'Error Password Wrong');
              // console.log("Contraseña o Usuario incorrecto")
            return next(null, false);
          } else {
            return next(null, user);
          }
        });
      }
      else {
        req.flash('error', 'Error Password NotSet');
          // console.log("ingrese contraseña")
        return next(null, false);
      }
    });
  });
};
