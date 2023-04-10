import Song from "../models/Song";
import User from "../models/User";

export const home = async (req, res) => {
  const songs = await Song.find({}).sort({createdAt:"desc"});
  return res.render("home", { pageTitle: "Home", siteName:"Ice Cream", songs });
};

export const watch = async(req, res) => {
  const { id } = req.params;
  const song = await Song.findById(id);
  if (!song) {
    return res.render("404", {pageTitle:"Song not found.", siteName:"Ice Cream"})
  }
  return res.render("watch", {pageTitle:song.title, siteName:"Ice Cream", song});
};

export const getUpload = (req, res) => {
  return res.render("upload", {pageTitle:"Upload Music", siteName:"Ice Cream"});
}

export const postUpload = async(req, res) => {
  const { title, artist, album, genre } = req.body;
  try {
    await Song.create ({
      title,
      artist,
      album,
      genre,
      createdAt:Date.now(),
    })
    return res.redirect("/")
  } catch (error) {
    return res.status(400).render("upload",{pageTitle:"Upload Music", siteName:"Ice Cream", errorMessage:error._message});
  }
};


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