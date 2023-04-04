import express from "express";
import { watch, getUpload, postUpload } from "../controllers/songController";

const songRouter = express.Router();

songRouter.get("/:id([0-9a-fd]{24})", watch);
songRouter.route("/upload").get(getUpload).post(postUpload);

export default songRouter;