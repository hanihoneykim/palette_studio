import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    title:String,
    artist:String,
    album:String,
    genre:String,
    createdAt:Date,
    meta:{
        views:Number,
        rating:Number,
    }

});

const Song = mongoose.model("Song", songSchema);

export default Song;
