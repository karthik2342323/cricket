const express = require('express');
const router = express.Router();
const myCricket=require('../components/working2')

/*router.post('/addTransactionDatas',myTransaction.addTransaction);
 */
router.post('/addCountry',myCricket.addCountry);
router.post('/removeCountry',myCricket.removeDatas);
router.post('/updateCountry',myCricket.updateDatas);
router.post('/getCountry',myCricket.getData);
router.post('/getListOfCOuntry',myCricket.getListofCountry);

module.exports = router;


