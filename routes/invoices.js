
const nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();
const Invoice = require("../models/Invoice");
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");


// @route   GET api/invoices
// @desc    Get all invoices
// @access  Public
router.get("/", async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ date: -1 });
    res.send(invoices);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/invoices/:id
// @desc    Edit an invoice
// @access  Public
router.put("/:id", async (req, res) => {
  const {
    id,
    createdAt,
    paymentDue,
    description,
    paymentTerms,
    clientName,
    clientEmail,
    status,
    senderAddress,
    clientAddress,
    items,
    total,
  } = req.body;
  const invoiceFields = {};
  if (id) invoiceFields.id = id;
  if (createdAt) invoiceFields.createdAt = createdAt;
  if (paymentDue) invoiceFields.paymentDue = paymentDue;
  if (description) invoiceFields.description = description;
  if (paymentTerms) invoiceFields.paymentTerms = paymentTerms;
  if (clientName) invoiceFields.clientName = clientName;
  if (clientEmail) invoiceFields.clientEmail = clientEmail;
  if (status) invoiceFields.status = status;
  if (senderAddress) invoiceFields.senderAddress = senderAddress;
  if (clientAddress) invoiceFields.clientAddress = clientAddress;
  if (items) invoiceFields.items = items;
  if (total) invoiceFields.total = total;

  try {
    let invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ msg: "Invoice not found" });
    invoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      {
        $set: invoiceFields,
      },
      { new: true }
    );

    const data = {
      id: id,
      createdAt: createdAt,
      clientEmail: clientEmail,
      clientName: clientName,
      paymentDue: paymentDue,
      description: description,
      paymentTerms: paymentTerms,
      status: status,
      senderAddress: senderAddress,
      clientAddress: clientAddress,
      items: items,
      total: total,
    };

    // Email sending function
    async function sendEmail() {
      const templatePath = path.join(__dirname, "email.ejs");
      const template = fs.readFileSync(templatePath, "utf8");
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
        subject: `Payement effectuer avec succes N° ${data.id}`,
        html: htmlContent,
      };

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log("Email sent: " + info.response);
      });
    }

    sendEmail();
    res.json(invoice);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// @route   POST api/invoices
// @desc    Add an invoice
// @access  Public
router.post("/", async (req, res) => {
  const {
    id,
    createdAt,
    paymentDue,
    description,
    paymentTerms,
    clientName,
    clientEmail,
    status,
    senderAddress,
    clientAddress,
    items,
    total,
  } = req.body;

  try {
    let newInvoice = new Invoice({
      id,
      createdAt,
      paymentDue,
      description,
      paymentTerms,
      clientName,
      clientEmail,
      status,
      senderAddress,
      clientAddress,
      items,
      total,
    });

    const invoice = await newInvoice.save();

    // Map the data fields
    const data = {
      id: id,
      createdAt: createdAt,
      clientEmail: clientEmail,
      clientName: clientName,
      paymentDue: paymentDue,
      description: description,
      paymentTerms: paymentTerms,
      status: status,
      senderAddress: senderAddress,
      clientAddress: clientAddress,
      items: items,
      total: total,
    };

    // Email sending function
    async function sendEmail() {
      const templatePath = path.join(__dirname, "email.ejs");
      const template = fs.readFileSync(templatePath, "utf8");
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
        to: data.clientEmail,
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
    }

    sendEmail();

    res.send(invoice);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// @route   DELETE api/invoices/:id
// @desc    Delete an invoice
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    let invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ msg: "Invoice not found" });
    await Invoice.findByIdAndRemove(req.params.id);
    res.json({ msg: "Invoice removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
