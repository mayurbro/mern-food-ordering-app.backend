import express from "express";
import multer from "multer";
import MyRestaurantController from "../controller/MyRestaurantController";
import { jwtCheck, parseJwt } from "../middleware/auth";
import { validateMyRestaurantRequest } from "../middleware/validation";
const router = express.Router();
// api/my/restaurant

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5mb (1024 * 1024 = 1mb)
  },
});
router.get(
  "/orders",
  jwtCheck,
  parseJwt,
  MyRestaurantController.getMyRestaurantOrders
);
router.patch(
  "/order/:orderId/status",
  jwtCheck,
  parseJwt,
  MyRestaurantController.updateOrderStatus
);
router.post(
  "/",

  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtCheck,
  parseJwt,

  MyRestaurantController.createMyRestaurant
);

router.get(
  "/",

  jwtCheck,
  parseJwt,

  MyRestaurantController.getMyRestaurant
);

// updating restaurant data

router.put(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtCheck,
  parseJwt,
  MyRestaurantController.updateRestaurant
);

export default router;
