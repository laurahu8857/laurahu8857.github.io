// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();
const nodemailer = require('nodemailer');
const request = require('request');
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword,
    },
});

//add listen to firebase database          指定regeister底下的id(不固定的id)
exports.sendMail = functions.database.ref('/register/{pushId}')
    .onCreate((snap, context) => {
        console.log('new message');
        console.log(snap.val());
        const mailOptions = {
            from: '"Laura Hu" <laura.hu@gogolook.com>',
            to: 'laura.hu@gogolook.com',
            subject: '比賽通知',
            text: JSON.stringify(snap.val()),
        };
        //mailTransport.sendMail(mailOptions);
        mailTransport.sendMail(mailOptions, function (err, info) {
            if (err){
                console.error('There was an error while sending the email:', err);
                //return res.redirect(500, err);
            }
            else{
                console.log('send mail success');
                //return res.redirect(200, 'OK');
            } 
        });
        //push to slack
        request.post('https://hooks.slack.com/services/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', { json: { text: `有個瘋gogolooer報名了<2019 走著瞧 斜眼歪舌笑死人全球大賽>` } })
    });
