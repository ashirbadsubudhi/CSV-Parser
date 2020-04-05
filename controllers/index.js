const FileModel = require('../models/csvfiles_model');
const path = require('path');
// const Papa = require('papaparse');
const csv = require('csv-parser');
const fs = require('fs');


module.exports.home = async function(req, res){
    FileModel.find({}, function(err, data){
        if(err){
            console.log("error in fetching contacts from db");
            return;
        }
        return res.render('home',{
            data: data
        });

    })
}

module.exports.upload = async function(req, res){
    try{
        let fileUpload = await FileModel.create({});
        FileModel.uploadedFile(req, res, function(err){
            if(err)
                console.log(err);
            // fileUpload.filePath = FileModel.filePath + '/' + req.file.filename;
            fileUpload.fileName = req.file.filename;
            fileUpload.filePath = req.file.path;
            fileUpload.save();
            console.log(req);
            return res.redirect('/upload/');    
        });

    }catch(err){
        console.log(err);
        return res.redirect('/upload/');
    }
}

module.exports.display = async function(req, res){
    try{
        let fileUpload = await FileModel.findOne({fileName: req.params.file});
        let fileData = [];
        fs.createReadStream(fileUpload.filePath).pipe(csv()).on('data', (data) => {fileData.push(data);});
        console.log("**************************");
        console.log(fileData);
        return res.json(400,{
            fileData
        });
    }
    catch(err){
        return res.json(400,{
            message: "DB error!!"+err
        });
    }
}