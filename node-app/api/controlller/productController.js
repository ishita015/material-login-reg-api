const Prod = require('../model/productModel');
var jwt = require('jsonwebtoken');
var multer = require('multer');
var fs = require('fs');

//------------------------------------ Operations user data --------------------------------------
exports.loginUser = (req, res, next) => {
    Prod.find({
        email: req.body.email, companyName: req.body.companyName
    }).then(data => {
        console.log(data)
        if (data) {
            const token = jwt.sign({
                email: data.email,
                _id: data._id,
                companyName: data.companyName
            },
                'secret',
                {
                    expiresIn: "5h"
                });
            res.status(201).json({
                message: "Loged In",
                body: data,
                token: token
            });
        } else {
            res.status(201).json({
                message: "Unauthorised",
            });
        }
    }).catch(err => {
        res.status(400).json({
            message: err,
        });
    })
}

multer({ dest: './api/upload-image/' });
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './api/upload-image/')
    },
    filename: function (req, file, cb) {
        cb(null, file.image)
    }
})
var upload = multer({ storage: storage });

exports.addProduct = (req, res) => {
    console.log('init');
    console.log(req.body);
    // console.log(req.image, 'files');
    let prod;

    if (req.body.image) {
        console.log(req.body)
        prod = new Prod({
            companyName: req.body.companyName,
            price: req.body.price,
            email: req.body.email,
            // image: new Buffer.from(encode_image, 'base64'),
            image: req.body.image,
        });
    } else {
        prod = new Prod({
            companyName: req.body.companyName,
            price: req.body.price,
            email: req.body.email,
        });
    }
    try {
        const result = prod.save();
        res.status(201).json({
            msg: "In Added successfully123",
            body: prod,
            success: true
        })

    }
    catch (err) {
        res.status(400).json({
            msg: "Backend Error",
            body: err,
            success: false
        })
    }
}

exports.getAllUser = (req, res) => {
    console.log('backend');
    Prod.find().then(result => {
        res.status(201).json({
            msg: "Users detail",
            body: result,
            success: true
        })
    }).catch(err => {
        res.status(400).json({
            msg: "Backend Error",
            body: err,
            success: false
        })
    })
}

exports.editUser = (req, res, next) => {
    Prod.findOne({ _id: req.params.id },{
        
    }).then(data => {

        if (!data) {
            return res.status(404).send({
                message: "Note not found with id "
            });
        }

        res.status(201).json({
            message: 'edit successfully',
            body: data            
        });
    }).catch(err => {
        console.log(err);
    });
}

exports.UpdateUser = (req, res, next) => {
    console.log('7777777777777777777');
    
    Prod.findByIdAndUpdate({ _id: req.body._id }, {
        companyName: req.body.companyName,
        price: req.body.price,
        email: req.body.email,
    }).then(data => {

        if (!data) {
            return res.status(404).send({
                message: "Note not found with id " + req.body.id
            });
        }

        res.status(201).json({
            message: 'update successfully' + req.body.id,
        });
    }).catch(err => {
        console.log(err);
    });
}

exports.deleteUser = (req, res, next) => {
    console.log("xxxxxxxxxxxxxxxxxxx xxxxxxxx delete init " + req.params.id);
    Prod.findByIdAndRemove({ _id: req.params.id })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.id
                });
            }
            res.status(201).json({
                message: 'Delete successfully',
            });
        }).catch(err => {
            console.log(err);
        });
}

exports.allDeleteUser = (req, res, next) => {

    Prod.deleteMany({ email: req.body.email, companyName: req.body.companyName })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Note not found with id " + req.body.email + req.body.companyName
                });
            }
            res.status(201).json({
                message: 'Delete all successfully',
            });
        }).catch(err => {
            console.log(err);
        });
}

// var nodemailer = require('nodemailer');
// exports.mail = (req, res, next) => {

//     var transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'ishita.linuxbean@gmail.com',
//             pass: 'ishitalb@'
//         }
//     });

//     const mailOptions = {
//         from: 'ishita.linuxbean@gmail.com', // sender address
//         to: 'ishita.linuxbean@gmail.com', // list of receivers
//         subject: 'node email', // Subject line
//         html: '<p>I will send u mail ishita!!!!!!!!!!!</p>'// plain text body
//     };

//     transporter.sendMail(mailOptions, function (err, info) {
//         if (err)
//             console.log(err)
//         else
//         res.send(info);
//     });
// }

const nodemailer = require('nodemailer');
exports.mail = (req, res, next) => {
  
    var auth = {
        type: 'oauth2',
        user: 'ishita.linuxbean@gmail.com',
        clientId: '612593537066-7s7qj9cdr9ck2vr2qu2md8goh367qcjb.apps.googleusercontent.com',
        clientSecret: 'xgWgnYl-sen8IySt7S9pLlDU',
        refreshToken: '1/9KC-2TT9BLKdNzTirFe1ea52B1erwwSYPTm2_PTnJXk',
    };
    var mailOptions = {
        from: 'ishita.linuxbean@gmail.com',
        to: 'ishita.linuxbean@gmail.com',
        subject: 'My site contact from: ',
        text: 'I will send u mail papa!!!!!!!!!!!!!!!!!',
       // html: 'Message from: ' + req.body.name + '<br></br> Email: ' +  req.body.email + '<br></br> Message: ' + req.body.message,
    };
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: auth,
    });
    transporter.sendMail(mailOptions, (err, res) => {
        if (err) {
            return console.log(err);
        } else {
            // res.send(res);

            console.log(JSON.stringify(res));
        }
    });
    res.end();
}
