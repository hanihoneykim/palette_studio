import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  credentials:{
    accessKeyId:process.env.AWS_ID,
    secretAccessKey:process.env.AWS_SECRET,
  }
})

const multerUploader = multerS3({
  s3: s3,
  bucket: 'palettee',
  acl: 'public-read',
})

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "XXXX";
  res.locals.loggedInUser = req.session.user || {};
  next();
};

export const protectorMiddleware = (req, res, next) => {
  if(req.session.loggedIn){
      return next();
  } else {
      return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn){
      return next();
  } else {
      return res.redirect("/");
  }
  
};


export const songUpload = multer({ 
  dest: "uploads/songs/", 
  limits: { 
    fileSize:10000000,
  },
  storage:multerUploader,
});

export const albumArtUpload = multer({ 
  dest:"uploads/albumarts/", 
  limits: {
    fileSize: 3000000,
  },
  storage:multerUploader,
});