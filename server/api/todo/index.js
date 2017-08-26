const _ = require('lodash');
const apiHelper = require('../api.helper');
const { authenticate, router } = apiHelper;
var entityName = 'todo';

router.post('/todo', authenticate, (req, res) => {
  var data = apiHelper.readData(req, res, entityName);
  if (!data) { return; }
  data._creator = req.user._id;
  apiHelper.saveDoc(res, entityName, data);
});

router.get('/todo', authenticate, (req, res) => {
  apiHelper.getByList(req, res, entityName, {
    findBy: {
      _creator: req.user._id
    }
  });
});

router.get('/todo/:id', authenticate, (req, res) => {
  apiHelper.getById(req, res, entityName, {
    findBy: {
      _creator: req.user._id
    }
  });
});

router.delete('/todo/:id', authenticate, (req, res) => {
  apiHelper.deleteById(req, res, entityName, {
    findBy: {
      _creator: req.user._id
    }
  });
});

router.patch('/todo/:id', authenticate, (req, res) => {
  var data = apiHelper.readPatchData(req, res, entityName);
  if (!data) { return; }
  const patchData = data.patchData;
  if (_.isBoolean(patchData.completed) && patchData.completed) {
    patchData.completedAt = new Date().getTime();
  } else {
    patchData.completed = false;
    patchData.completedAt = null;
  }
  apiHelper.patchDoc(res, entityName, data, {
    findBy: {
      _creator: req.user._id
    }
  });
});

module.exports = router;