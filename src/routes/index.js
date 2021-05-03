const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Appo = require('../models/Appo');


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
        res.render('mangeAppointment', {
            user: req.user
        })
    } else {
        res.render('setAppointment', {
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

module.exports = router;
