import multer from "multer";

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


export const songUpload = multer({ dest: "uploads/songs/", limits: { fileSize:10000000 }});
export const albumArtUpload = multer({ dest:"uploads/albumarts/", limits: {fileSize: 3000000 }});