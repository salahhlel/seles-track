const Category = require('../models/Category.js');

// Create
async function createCategory(req, res) {
  try {
    const { Categoryname } = req.body;
    const category = await Category.create({ Categoryname });
    res.status(201).json(category);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Read all
async function getAllCategories(req, res) {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error getting categories:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Read one
async function getCategoryById(req, res) {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error('Error getting category by id:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Update
async function updateCategory(req, res) {
  try {
    const { id } = req.params;
    const { Categoryname } = req.body;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    await category.update({ Categoryname });
    res.status(200).json(category);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Delete
async function deleteCategory(req, res) {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    await category.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
const getidbyname =(req,res)=>{
    try{
        const name=req.params.name;
        const result=Category.findOne( { where : { Categoryname : name } })
        res.json(result.idCategory)
    }
    catch(err){
        console.error(err);
        res.status(500).send("erreur")
    }
}
// const getcategorybypdv =async (req,res)=>{
//   const { name }=req.params
//   try {
//     const expositions = await Category.findAll({
//       include: [
//         {
//           model: Reference,
//           include: [
//             {
//               model: Article,
//               include: [
//                 {
//                   model: Exposition,
//                   include: [
//                     {
//                       model: PDV,
//                       where:  pdvname
//                     }
//                   ]
//                 }
//               ]
//             }
//           ]
//         }
//       ]
//     });
//   }
//   catch(err){
//     console.error(err);
//     res.status(500).send("erreur")
// }
  
// }



module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
};
