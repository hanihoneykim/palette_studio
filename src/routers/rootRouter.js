import express from "express";
import { home, } from "../controllers/songController";
import { getJoin, postJoin, getLogin, postLogin } from "../controllers/userController"
import { publicOnlyMiddleware } from "../middlewares";


const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").all(publicOnlyMiddleware).get(getLogin).post(postLogin);


export default rootRouter;
