import express from "express";
import { registerView } from "../controllers/songController";

const apiRouter = express.Router();

apiRouter.post("/songs/:id([0-9a-fd]{24})/view", registerView);

export default apiRouter;