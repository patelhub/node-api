const apiHelper = require('../api.helper');
const { authenticate, router } = apiHelper;
var entityName = 'candidate';

router.post('/candidate', (req, res) => {
  var data = apiHelper.readData(req, res, entityName);
  if (!data) { return; }
  apiHelper.saveDoc(res, entityName, data);
});

router.get('/candidate', (req, res) => {
  return apiHelper.getByList(req, res, entityName);
});

router.get('/candidate/:id', (req, res) => {
  return apiHelper.getById(req, res, entityName);
});

router.delete('/candidate/:id', (req, res) => {
  return apiHelper.deleteById(req, res, entityName);
});

router.patch('/candidate/:id', (req, res) => {
  var data = apiHelper.readPatchData(req, res, entityName);
  if (!data) { return; }
  const patchData = data.patchData;
  patchData.updatedAt = new Date().getTime();
  apiHelper.patchDoc(res, entityName, data);
});

module.exports = router;