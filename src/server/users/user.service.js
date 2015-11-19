var four0four = require('../utils/404')();

var data = require('../data');
module.exports = function () {
    var service = {
        getUsers: getUsers,
        getUser: getUser,
        saveUser: saveUser
    };
    return service;

    function getUsers(req, res, next) {
        console.log('getusers start');
        res.status(200).send(data.users);
    }

    function getUser(req, res, next) {
        var id = +req.param.id;
        var user = data.users.filter(function (p) {
            return p.id === id;
        })[0];
        if (user) {
            res.status(200).send(user);
        } else {
            four0four.send404(req, res, 'user ' + id + ' not found');
        }
    }

    function saveUser(req, res, next) {
        var user = {};
        user.name = req.body.name;
        user.id= req.body.id;
        user.username= req.body.username;
        user.address= req.body.address;
        user.mail= req.body.mail;
        user.phone= req.body.phone;

        console.log(user);
    }
};
