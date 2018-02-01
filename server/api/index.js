const express = require('express');
const user = require('./user');
const todo = require('./todo');
const candidate = require('./candidate');
const razorpay = require('./razorpay');
const schemaManager = require('./schemaManager');
const router = express.Router();

router.use('/', user);
router.use('/', todo);
router.use('/', candidate);
router.use('/', razorpay);
router.use('/', schemaManager);

router.use(function (req, res, next) {
  var err = new Error('Not Found(:<:<:<:<:<)');
  err.status = 404;
  // next(err);
  return res.send({ 'error': 404 });
});

// error handler
router.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({ 'error': 404 });
});



module.exports = router;
