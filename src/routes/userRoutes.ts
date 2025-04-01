import express from "express";
const router = express.Router();
import myUserController from "../controller/myUserController";
import { jwtCheck, parseJwt } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";
router.get("/", jwtCheck, parseJwt, myUserController.getUserData);
router.post("/", jwtCheck, myUserController.createCurrentUser);
router.put(
  "/",
  jwtCheck,
  parseJwt,
  validateMyUserRequest,
  myUserController.updateCurrentUser
);

export default router;
