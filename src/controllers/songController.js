import { async } from "regenerator-runtime";
import Song from "../models/Song";
import User from "../models/User";


export const home = async (req, res) => {
  const songs = await Song.find({}).sort({createdAt:"desc"});
  return res.render("home", { pageTitle: "Home", siteName:"Palette Live Studio", songs });
};

export const watch = async(req, res) => {
  const { id } = req.params;
  const song = await Song.findById(id);
  const songs = await Song.find({}).sort({createdAt:"desc"});
  if (!song) {
    return res.render("404", {pageTitle:"Song not found.", siteName:"Palette Live Studio"})
  }
  return res.render("watch", {pageTitle:song.title, siteName:"Palette Live Studio", song, songs});
};

export const getUpload = (req, res) => {
  return res.render("upload", {pageTitle:"Upload Music", siteName:"Palette Live Studio"});
}

export const postUpload = async(req, res) => {
  const { song, albumArt } = req.files;
  console.log(song, albumArt);
  const { title, artist, album, genre } = req.body;
  try {
    await Song.create ({
      title,
      artist,
      album,
      genre,
      fileUrl:song[0].path,
      albumArtUrl:albumArt[0].path.replace(/[\\]/g, "/"),
      createdAt:Date.now(),
    })
    return res.redirect("/")
  } catch (error) {
    console.log(error._message);
    return res.status(400).render("upload",{pageTitle:"Upload Music", siteName:"Palette Live Studio", errorMessage:error._message});
  }
};

export const likes = async(req, res) => {
  const songs = await Song.find({}).sort({createdAt:"desc"});
  return res.render("likes",{pageTitle:"Likes", siteName:"Palette Live Studio", songs})
}

export const getLp = async(req, res) => {
  const songs = await Song.find({}).sort({createdAt:"desc"});
  return res.render("lpPlay", { pageTitle: "Home", siteName:"Palette Live Studio", songs });
};

/*

export const getEdit = async(req, res) => {
  const { id } = req.params;
  const song = await Song.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle:"Song not found"});
  }
  return res.render("edit", {pageTitle:`Edit: ${song.title}`, siteName:"Palette Live Studio", song})
}

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title, artist, album, albumUrl}
  return res.render("watch", {pageTitle:song.title, siteName:"Palette Live Studio", song});
  //여기서부터 해야함
}

*/


export const registerView = async (req, res) => {
  const { id } = req.params;
  const song = await Song.findById(id);
  if (!song) {
    return res.sendStatus(404);
  }
  song.meta.views = song.meta.views + 1;
  await song.save();
  return res.sendStatus(200);
};