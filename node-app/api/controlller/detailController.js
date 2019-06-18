const User = require('../model/detailModel');

exports.addUser = async (req, res) => {
    console.log('init');
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        cell: req.body.cell,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const result = await user.save();
        res.status(201).json({
            msg: "Added successfully",
            body: result,
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

    // user.save()
    //     .then(result => {
    //         res.status(201).json({
    //             msg: "Added successfully",
    //             body: result,
    //             success: true
    //         })
    //     }).catch(err => {
    //         res.status(400).json({
    //             msg: "Backend Error",
    //             body: err,
    //             success: false
    //         })
    //     })

}




exports.getAllUsers = (req, res) => {
    // try {
    //     const result = await User.find();
    //     res.status(201).json({
    //         msg: "All Users detail",
    //         body: result,
    //         success: true
    //     });
    // }
    // catch (err) {
    //     res.status(400).json({
    //         msg: "Backend Error",
    //         body: err,
    //         success: false
    //     })
    // }
    User.find().then(result => {
        res.status(201).json({
            msg: "All Users detail",
            body: result,
            success: true
        })
    }).catch(err  => {
        res.status(400).json({
            msg: "Backend Error",
            body: err,
            success: false
        })
    })

}