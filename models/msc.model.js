const mongoose = require("mongoose");

const mscThesisSchema = new mongoose.Schema({
    title: String,
    author: String,
    department: String,
    year: String,
    course: String,
    pdf_origianl_name : String,
    pdf: String,
});

mscThesisSchema.virtual('url').get(function () {
    const baseUrl = 'http://localhost:3000'; // Replace with your base URL
    return `${baseUrl}/${this.pdf}`;
  });

module.exports = mongoose.model("mscthesis",mscThesisSchema)

