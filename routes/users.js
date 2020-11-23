const  express = require('express');
const converter = require('json-2-csv');
const {DateTime} = require('luxon')
const fs = require('fs')
const router = express.Router();


router.post('/', async (req,res) => {

  const data = [{
    "id": req.body.userId,
    "клики.tapIcon": req.body.iconsClick['tapIcon']|| 0,
    "клики.heartIcon": req.body.iconsClick['heartIcon'] || 0,
    "клики.batteryIcon": req.body.iconsClick['batteryIcon'] || 0,
    "клики.xTapIcon": req.body.iconsClick['xTapIcon'] || 0,
    "клики.xHeartIcon": req.body.iconsClick['xHeartIcon'] || 0,
    "клики.xBatteryIcon": req.body.iconsClick['xBatteryIcon'] || 0,
    "кнопка": req.body.clickedButton,
    "время на сайте (сек.)": req.body.timeBeforeAction['seconds'],
    "время на сайте (мин.)": req.body.timeBeforeAction['minutes'],
    "дата": DateTime.local().toFormat("dd.MM.yyyy - HH:mm:ss")
  }]



  converter.json2csv(data, (err, csv) => {
    if (err) {
      throw err;
    }

    fs.appendFileSync('./static/log.csv', "\n" + csv);
  }, {prependHeader: false});

  res.send("ok")

});

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/csv', function(req, res, next) {
  res.header('Content-Type', 'text/csv');
  res.attachment('fileName');
  return res.send(csv);

});




module.exports = router;
