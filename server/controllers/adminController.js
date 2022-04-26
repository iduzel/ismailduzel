const express = require("express");
const Category = require("../models/CategoryModel");
const router = express.Router();

router.get("/list", async (req, res) => {
  try {
    const categories = await Category.find();
    console.log("CATEGORIES LIST IS: ", categories);
    res.send(categories);
  } catch (error) {
    console.log("Category listing ERROR: ", error.message);
    res.send(error.message);
  }
});

router.get("/", (req, res) => {
  res.send("HELLO FROM ADMIN CONTROLLER");
});

// LIST
router.get("/categories/list", async (req, res) => {
  try {    
    const categories = await Category.find().sort({$natural:-1});
    res.send(categories);
  } catch (error) {
    console.log("category listing error", error.message);
    res.send(error.message);
  }
});
// add
router.post("/categories", async (req, res) => {
  try {
    console.log("CategoryController/category req body is: ", req.body);

    const { name } = req.body;

    if (!name) return res.send({ success: false, errorId: 1 });

    const newCategory = new Category(req.body);
    console.log("newCategory: ", newCategory);
    const category = await newCategory.save();

    res.send({ success: true, category });
  } catch (error) {
    console.log("Category Error: ", error.message);
  }
});

// delete

router.delete('/categories/delete/:categoryid', async (req, res) => {

  try {
    console.log('req.params is: ',req.params)
    const { categoryid } = req.params
    console.log('categoryid: ', categoryid)


    const category =  await Category.findByIdAndDelete(categoryid)

    if( !category) return res.sendStatus(404)
    res.send({success:true,  category})
   
    
  } catch (error) {
    console.log('Category DELETE Error message: ', error.message)
    res.send(error.message)
  }
})

module.exports = router;
