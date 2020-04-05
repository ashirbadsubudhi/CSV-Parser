//importing library
const express = require('express');
const router = express.Router();
const home = require('../controllers/index');
// const multer = require('multer');
// const upload = multer({dest: 'uploads/'});

//
router.get('/upload/', home.home);
router.post('/uploads/file', home.upload);
router.get('/upload/:file', home.display);

router.all('/*',function(req, res){
    return res.render('404');
});

//exporting module
module.exports = router;