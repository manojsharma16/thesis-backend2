const mongoose = require("mongoose");

const thesisSchema = new mongoose.Schema({
    title: String,
    author: String,
    department: String,
    year: String,
    course: String,
    pdf_origianl_name : String,
    pdf: String,
});

thesisSchema.virtual('url').get(function () {
    const baseUrl = 'http://localhost:3000'; // Replace with your base URL
    return `${baseUrl}/${this.pdf}`;
  });

module.exports = mongoose.model("thesis",thesisSchema)

