const _ = require('lodash');
const apiHelper = require('../api.helper');
const { authenticate, router } = apiHelper;
var entityName = 'razorpay';
const Razorpay = require('razorpay')

router.post('/razorpay', (req, res) => {
  req.params.amount = 7000;
  var data = apiHelper.readData(req, res, entityName);
  if (!data) { return; }

  data.amount = parseInt(data.amount);
  apiHelper.saveDoc(res, entityName, data,
    (savedData) => {
      var dataUpdate = { id: savedData._id, patchData: data };
      if (!dataUpdate) { return; }
      const patchData = dataUpdate.patchData;

      var instance = new Razorpay({
        key_id: 'rzp_test_ny4zBzrXG0REQe',
        key_secret: 'PahIy7Wu3ret517zLjenYXtP'
      });
      instance.orders.create({ amount: data.amount, receipt: savedData._id + '' },
        (error, response) => {
          if (error) {
            res.status(500).send(error);
          } else {
            patchData.razorpay_odrderId = response.id;
            apiHelper.patchDoc(res, entityName, dataUpdate);
          }
        });
    });
});

router.get('/razorpay', (req, res) => {
  apiHelper.getByList(req, res, entityName);
});

router.get('/razorpay/:id', (req, res) => {
  return apiHelper.getById(req, res, entityName);
});

router.delete('/razorpay/:id', (req, res) => {
  return apiHelper.deleteById(req, res, entityName);
});

router.patch('/razorpay/:id', (req, res) => {
  var data = apiHelper.readPatchData(req, res, entityName);
  if (!data) { return; }
  apiHelper.patchDoc(res, entityName, data);
});

module.exports = router;