const express = require('express');
const router = express.Router();
const referenceselController = require('../controllers/Ref-SelC');

router.get('/ReferenceSel',referenceselController.getAllReferencehasSellouts)
router.post('/creatRefSel',referenceselController.createReference_has_Sellout)


module.exports = router;