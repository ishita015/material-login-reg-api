const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
const Prod = require('../model/productModel');
const fileData = require('../model/fileData');
const productionCon = require('../controlller/productController');
var multer = require('multer');
var fs = require('fs');

multer({ dest: './api/upload-image/' });
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './api/upload-image/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage });

router.get('/get', productionCon.getAllUser);
// Login and get user data
router.post('/login', productionCon.loginUser);
router.post('/add',upload.single('image'), productionCon.addProduct);
router.post('/update', productionCon.UpdateUser);
router.get('/edit/:id', productionCon.editUser);
router.delete('/del/:id', productionCon.deleteUser);
router.delete('/delete', productionCon.allDeleteUser);
router.post('/mail',productionCon.mail);

//---------------------------------- File upload the images --------------------------------------------------


router.use(express.static('./api/upload-image/'));
router.post('/file-upload', upload.any(), (req, res, next) => {
    console.log(req.params, 'Body');
    console.log(req.files, 'files');
    res.end();
});

//---------------------------------- base64 the images --------------------------------------------------


router.post('/uploadphoto', upload.single('image'), (req, res) => {
    console.log(req.params, 'Body');
    console.log(req.file, 'files');
    var img = fs.readFileSync(req.file.path);
    var encode_image = img.toString('base64');
    const fileData1 = new fileData({
        contentType: req.file.mimetype,
        image: new Buffer.from(encode_image, 'base64')
    });
    fileData1.save()
        .then(item => {
            res.send(fileData1);
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
})

router.post('/authenticate', function (req, res) {

// ---------------------------------------find authorize user ---------------------------------------
    Prod.findOne({
        email: req.body.email
    }, function (err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else {


            // check if password matches
            if (user.email != req.body.email) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {
                console.log('dsaaaa', user.email);

                // if user is found and password is right
                // create a token
                var token = jwt.sign({ user }, 'fdsfs', {
                    expiresIn: "5h" // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }

        }
    });
});
// TODO: route middleware to verify a token
router.use(function (req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, 'fdsfs', function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

// route to show a random message (GET http://localhost:3000/api/)
router.get('/', function (req, res) {
    res.json({ message: 'Welcome to the coolest API on earth!' });
});
// router.post('/login', productionCon.loginUser);

module.exports = router;