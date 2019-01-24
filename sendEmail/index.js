
var aws = require("aws-sdk");
var nodemailer = require("nodemailer");

var ses = new aws.SES();
var s3 = new aws.S3();

exports.handler = function (event, context, callback) {

    // var myEmail = `
    //     <h1>This text should be large, because it is formatted as a header in HTML.</h1>
    //     <p>Here is a formatted link: <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/Welcome.html">Amazon Simple Email Service Developer Guide</a>.</p>
    //     <img src="https://media.licdn.com/dms/image/C4E03AQFQy8Gv5CIE1w/profile-displayphoto-shrink_200_200/0?e=1553126400&v=beta&t=z1dFcaQbFwKzzBAeseLDVp2wp3LHs1YzVs3BSsaU1aA">
    // `

    // complete email must be sent base64 encoded
    var myEmail = Buffer.from(event.html, 'base64').toString('ascii');
    // var myEmail = event.html;

    var mailOptions = {
        from: "gxvigo@gmail.com",
        subject: "This is an email sent from a Lambda function!",
        // html: `<p>You got a contact message from: <b>${event.emailAddress}</b></p>`,
        // html: `<p>You got a contact message from: <h1>giovanni</h1></p>`,
        html: myEmail,
        to: "gxvigo@gmail.com",
        // bcc: Any BCC address you want here in an array,
    };

    // create Nodemailer SES transporter
    var transporter = nodemailer.createTransport({
        SES: ses
    });

    // send email
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log("Error sending email");
            callback(err);
        } else {
            console.log("Email sent successfully");
            callback();
        }
    });
};
