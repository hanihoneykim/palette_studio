import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    title: { type:String, required:true, trim:true, maxLength:80 },
    fileUrl: { type:String, required:true },
    albumArtUrl: { type:String, required:true },
    artist:{ type:String, required:true, trim:true, maxLength:80 },
    album:{ type:String, required:true, trim:true, maxLength:80 },
    genre:{ type:String, required:true, trim:true },
    createdAt:{ type:Date, required:true, default:Date.now },
    meta:{
        views:{ type: Number, default: 0, required: true },
        rating:{ type: Number, default: 0, required: true },
    }

});

const Song = mongoose.model("Song", songSchema);

export default Song;
