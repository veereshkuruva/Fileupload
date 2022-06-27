const express = require('express')
const app = express()
const port = 3000
const multipart = require('connect-multiparty');
const cloudinary = require('cloudinary');
const cors =require("cors")

cloudinary.config({ 
    cloud_name: '', 
    api_key: '', 
    api_secret: '',
    secure: true
  });


app.use(cors())
const multipartMiddleware =multipart({uploadDir:"./photoupload"});

app.post('/upload', multipartMiddleware, function(req, res) {
     
    cloudinary.uploader.upload(req.files.file.path, function(result, error) {
        if(error){
            res.json({
                message:"failed to upload image"
            })
        }
        else{
            res.json({
                message:"successfully fileupload",
                imageUrl:result.url
               })
        }
    console.log(result, error)});
   
     
      
  });


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})