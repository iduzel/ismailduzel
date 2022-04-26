const express = require("express");
const Employee = require("../models/EmployeeModel");
const router = express.Router();
const multer = require("multer");

//CLOUDINARY

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storageCloudinary = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Store",
    format: async (req, file) => {
      let extension = "";

      if (file.mimetype.includes("image")) {
        extension = file.mimetype.slice(6);

        if (extension === "jpeg") extension = "jpg";
      }

      return extension;
    },
    public_id: (req, file) =>
      `${req.body._id}-${Date.now()}-${file.originalname}`,
  },
});

const uploadCloudinary = multer({ storage: storageCloudinary });

router.get("/list", async (req, res) => {
  try {
    const employees = await Employee.find();

    res.send(employees);
  } catch (error) {
    console.log("employee listing error", error.message);
    res.send(error.message);
  }
});

router.post("/add", uploadCloudinary.single("image"), async (req, res) => {
  try {
    console.log("employeeController/register req body is: ", req.body);

    const { name, email, address, phone, department, tags, date } = req.body;

    if (!name || !email) return res.send({ success: false, errorId: 1 });

    if (req.file) req.body.image = req.file.path;
    const newEmployee = new Employee(req.body);
    console.log("newEmployee: ", newEmployee);
    const employee = await newEmployee.save();

    res.send({ success: true, employee });
  } catch (error) {
    console.log("Employee Error: ", error.message);
  }
});

router.delete('/delete/:employeeid', async (req, res) => {

  try {
    console.log('req.params is: ',req.params)
    const { employeeid } = req.params
    console.log('employeeIDBBBBBBB: ', employeeid)


    const employee =  await Employee.findByIdAndDelete(employeeid)

    if( !employee) return res.sendStatus(404)
    res.send({success:true,  employee})
   
    
  } catch (error) {
    console.log('Employee DELETE Error message: ', error.message)
    res.send(error.message)
  }
})

router.put('/edit/:employeeid', uploadCloudinary.single("image"), async (req, res) => {

  try {
    console.log('req.params is: ',req.params)
   
    console.log('req body is', req.body);
    
    if (req.file) req.body.image = req.file.path;
    const { employeeid } = req.params
    console.log('employee EDIT ID: ', employeeid)

    const employee = await Employee.findByIdAndUpdate(employeeid, {
      name:req.body.name,
      email: req.body.email,
      address: req.body.address,
      phone: req.body.phone,
      department: req.body.department,
      date: req.body.date,
      tags: req.body.tags,
      image: req.body.image,
      role: req.body.role
    })

    res.send({success: true, employee})
    
  } catch (error) {
    console.log('Employee EDIT Error message: ', error.message)
    res.send(error.message)
  }
})

module.exports = router;
