import express from "express";
import { likes, } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/likes", likes);

export default userRouter;