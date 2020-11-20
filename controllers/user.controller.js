const bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    userRepo = require('../repo/userRepo');

module.exports = {
    create: (req, res, next) => {

        userRepo.create({ name: req.body.name, email: req.body.email, password: req.body.password }, function(err, result) {
            if (err)
                next(err);
            else
                res.json({ status: "success", message: "User added successfully!!!", data: { name: result.name, email: result.email } });
        });
    },
    authenticate: function(req, res, next) {
        userRepo.findOne({ email: req.body.email }, function(err, userInfo) {
            if (err) {
                next(err);
            } else {
                if (userInfo && bcrypt.compareSync(req.body.password, userInfo.password)) {
                    const token = jwt.sign({ id: userInfo._id }, req.app.get('secretKey'), { expiresIn: '1h' });
                    res.status(200).json({ status: "success", message: "user found!!!", data: { user: userInfo, token: token } });
                } else {
                    res.status(400).json({ status: "error", message: "Invalid email/password!!!", data: null });
                }
            }
        });
    }
}