var express = require('express');
var router = express.Router();

var qp = require('flexqp');
qp.presetConnection(require('../dbconfig.json'));

var dbconfig = require('../dbconfig.json');
var nodemailer = require('nodemailer');

module.exports = {
    email: function (email, subject, text) {
      var einfo;
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'CMSServices.gov@gmail.com',
          pass: '@a123456b'
        }
      });
  
      var mailOptions = {
        from: 'CMSServices.gov@gmail.com@gmail.com',
        to: email,
        subject: subject,
        text: text
      };
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        }
        else {
          console.log('Email sent: ' + info.response);
        }
      })
     return('Email send');
    },
    messageBuilder: function (type, message) {
      var m = {};
      m.message = message;
      m.type = type ||  'info';
    
      return m;
    }
    
  }