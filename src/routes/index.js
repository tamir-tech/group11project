const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Appo = require('../models/Appo');
const Insu = require('../models/Insu');
const nodemailer = require('nodemailer');
const Str = require('@supercharge/strings')
const Post = require('../models/Post');
const Comm = require('../models/Comm');
// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);
// Dashboard
router.get('/profile', ensureAuthenticated, (req, res) => {
    if (req.user.radio == 'doctor') {
        res.render('doctorProfile', {
            user: req.user
        })
    } else {
        res.render('userProfile', {
            user: req.user
        })
    }
});
router.get('/appointment',ensureAuthenticated,(req,res)=> {
    if (req.user.radio == 'doctor') {
        Appo.find({dname:req.user.name},function (err,appo)
        {if(err) throw err
            res.render('mangeAppointment', {
                user: req.user,appos:appo

        })

        }
    )
    } else {
        res.render('setAppointment', {
            user: req.user
        })
    }
})
router.delete ('manageAppointment',ensureAuthenticated,(req,res)=>{

})
router.get('/flightHealthInsurance',ensureAuthenticated,(req,res)=> {
    if (req.user.radio == 'doctor') {
        res.render('flightHealthInsurance', {
            user: req.user
        })
    } else {
        res.render('flightHealthInsurance', {
            user: req.user
        })
    }
})
router.post('/appointment',(req, res) => {
    if (req.user.radio == 'doctor') {
    }
    else{

    let errors = [];
    const { name, lastname, filed, dname,date,time,subject } = req.body;
    if (!name || !lastname || !filed || !dname|| !date|| !time|| !subject) {
        errors.push({ msg: 'Please enter all fields' });
    }
    if (errors.length > 0) {
        res.render('setAppointment', {
            errors,
            name,
            lastname,
            filed,
            dname,
            date,
            time,
            subject,
        });
        }
    else{
    Appo.findOne({date:date }).then(appo=>{
        if(appo){
            errors.push({ msg: 'date and time already exsist' });
            res.render('setAppointment', {
                errors,  name, lastname, filed, dname,date,time,subject

            })

        }


    else {
            const newAppo = new Appo({
                name,
                lastname,
                filed,
                dname,
                date,
                time,
                subject
            }).save();
            console.log(newAppo)
            res.redirect('/dashboard')
        }

    })}} })
router.post('/flightHealthInsurance',(req, res) => {


    let errors = [];
    const {name, lastname, filed, id, date, date2, payment} = req.body;
    if (!name || !lastname || !filed || !id || !date || !date2 || !payment) {
        errors.push({msg: 'Please enter all fields'});
    }
    if (errors.length > 0) {
        res.render('flightHealthInsurance', {
            errors,
            name,
            lastname,
            filed,
            id,
            date,
            date2,
            payment,
        });
    } else {
        Insu.findOne({date: date}).then(insu => {
            if (insu) {
                errors.push({msg: 'insurance date already exsist'});
                res.render('flightHealthInsurance', {
                    errors, name, lastname, filed, id, date, date2, payment

                })

            } else {
                const confirm= Str.random(10)
                const newInsu = new Insu({
                    name,
                    lastname,
                    filed,
                    id,
                    date,
                    date2,
                    payment,
                    confirm
                }).save();
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'bitonkfir0@gmail.com',
                        pass: 'kfir1234'
                    }
                });


                const mailOptions = {
                    from: 'bitonkfir0@gmail.com',
                    to: req.user.email,
                    subject: 'flight Health Insurance confirmation',
                    text: 'That youre email confirmation for flight Health Insurance' +
                        ' youre written proof number is:'+confirm


                }


                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                res.redirect('/dashboard')
            }


        })
    }
})
router.get('/forum',ensureAuthenticated,(req,res)=> {
    Post.find({}, function (err,data){
        if (err)
            throw err
        Comm.find({}, function (err,data1){
            if (err)
                throw err

            res.render('forums', {posts : data,comms:data1})
        })

    })

})

router.post('/createpost',(req, res) => {
        let errors = [];
        const { title, para } = req.body;
        if (!title || !para) {
            errors.push({ msg: 'Please enter all fields' });
        }
        if (errors.length > 0) {
            res.render('createpost', {
                errors,
                title,
                para,
            });
        }
                else {
                    const newPost = new Post({
                        Title :title,
                        Para: para
                    }).save();
                    console.log(newPost)
                    res.redirect('/forum')
                }

            })
router.get('/createpost',ensureAuthenticated,(req,res)=> {
        res.render('createpost')
})
router.get('/contact',ensureAuthenticated,(req,res)=> {
        res.render('contact')

})
router.post('/forum',(req, res) => {
    let errors = [];
    const {title, para} = req.body;
    console.log(title)
    console.log(para)
    const newComm = new Comm({
        Title :title,
        Para: para
    }).save();

    res.redirect('/dashboard')
})
module.exports = router;
