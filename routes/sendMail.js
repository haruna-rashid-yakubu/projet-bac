const nodemailer = require("nodemailer");
const express = require("express");
const sendMail = require("./sendMail");
const router = express.Router();
const Invoice = require("../models/Invoice");
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
// JSON data
const data = {
  id: "ZO1709",
  createdAt: "2024-05-14",
  paymentDue: "2024-05-22",
  description: "jhcbdcnd vkdjknv jnkkjn",
  paymentTerms: 7,
  clientName: "klnnkknkln",
  clientEmail: "worketyamo.dev@gmail.com",
  status: "paid",
  senderAddress: {
    street: "Yaoundé, Melen",
    city: "Yaoundé",
    postCode: "JHBFJHBFJFJ",
    country: "Cameroun",
  },
  clientAddress: {
    street: "Yaoundé, Melen",
    city: "Yaoundé",
    postCode: "0000000",
    country: "Cameroun",
  },
  items: [
    {
      name: "vjhjhkjhvjkvh",
      quantity: "67",
      price: "48796757",
      total: "3269382719.00",
      itemId: "7c1e7a35-40c4-4660-9421-315ee775603d",
    },
    {
      name: "vjhjhkjhvjkvh",
      quantity: "67",
      price: "48796757",
      total: "3269382719.00",
      itemId: "7c1e7a35-40c4-4660-9421-315ee775603d",
    },
    {
      name: "vjhjhkjhvjkvh",
      quantity: "67",
      price: "48796757",
      total: "3269382719.00",
      itemId: "7c1e7a35-40c4-4660-9421-315ee775603d",
    },
    {
      name: "vjhjhkjhvjkvh",
      quantity: "67",
      price: "48796757",
      total: "3269382719.00",
      itemId: "7c1e7a35-40c4-4660-9421-315ee775603d",
    },
  ],
  total: "3269382719.0",
};

const templatePath = path.join(__dirname, 'email.ejs');
const template = fs.readFileSync(templatePath, 'utf8')



const htmlContent = ejs.render(template, data);

// Create a transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "worketyamo.dev@gmail.com",
    pass: "rnvp yole txhx xlhj",
  },
});

const mailOptions = {
  from: "worketyamo.dev@gmail.com",
  to: "worketyamo.melen@gmail.com",
  subject: `Factures N° ${data.id}`,
  html: htmlContent,
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log("Email sent: " + info.response);
});
