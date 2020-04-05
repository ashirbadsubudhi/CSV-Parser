//importing library
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const FILE_PATH = path.join('/uploads/csv');

//creating question schema
const csvFilePathSchema = new mongoose.Schema({
    fileName: {
        type: String
    },
    filePath: {
        type: String
    }
},{
    versionKey: false,
    timestamps: true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..'  , FILE_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.csv');
    }
  });


csvFilePathSchema.statics.uploadedFile = multer({storage:  storage}).single('csv');
csvFilePathSchema.statics.filePath = FILE_PATH;  

const FileModel = mongoose.model('filePath', csvFilePathSchema);

//exporting module
module.exports = FileModel;