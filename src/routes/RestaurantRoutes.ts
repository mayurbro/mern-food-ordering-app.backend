import express from "express";
import { param } from "express-validator";
const router = express.Router();
import RestaurantController from "../controller/RestaurantController";

router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City parameter must be valid string"),
  RestaurantController.searchRestaurant
);
router.get(
  "/:restaurantId",
  param("restaurantId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Restaurant parameter must be a valid string"),
  RestaurantController.getRestaurant
);
router.get("/restaurantslist", RestaurantController.getRestaurants);
export default router;
