const express = require('express');
const router = express.Router();

const userCtrl = require("../../controllers/user.controller")
const mscThesisCtrl = require("../../controllers/msc-thesis.controller")
const phdThesisCtrl = require("../../controllers/phd-thesis.controller")
const thesisCtrl = require("../../controllers/thesis.controller")
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });
  const upload = multer({ storage: storage });

router.post("/login",userCtrl.login);

router.post("/add-user",userCtrl.addUser);

router.get("/get-user",userCtrl.getUser);

router.get("/getUserById",userCtrl.getUserById);

router.put("/edit-user",userCtrl.editUser);

router.delete("/delete-user",userCtrl.deletUser);

router.post("/add-msc-thesis",upload.single('pdf'),mscThesisCtrl.addThesis);

router.get("/get-msc-thesis",mscThesisCtrl.getThesis);

router.get("/get-msc-thesis-by-id",mscThesisCtrl.getThesisById);

router.delete("/delete-msc-thesis",mscThesisCtrl.deleteThesis);

router.post("/add-thesis",upload.single('pdf'),thesisCtrl.addThesis);

router.put("/edit-thesis",upload.single('pdf'),thesisCtrl.editThesis);

router.get("/get-thesis",thesisCtrl.getThesis);

router.get("/get-thesis-by-id",thesisCtrl.getThesisById);

router.delete("/delete-thesis",thesisCtrl.deleteThesis);

router.post("/add-phd-thesis",upload.single('pdf'),phdThesisCtrl.addThesis);

router.get("/get-phd-thesis",phdThesisCtrl.getThesis);

router.get("/get-phd-thesis-by-id",phdThesisCtrl.getThesisById);

router.delete("/delete-phd-thesis",phdThesisCtrl.deleteThesis);

module.exports = router;