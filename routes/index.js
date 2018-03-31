var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express', framework: 'AngularJS'});
});

router.post('/login', function(req, res) {
	res.send(req.body);
})

module.exports = router;