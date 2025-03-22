import { Request, Response } from "express";
import Restaurant from "../models/restaurant";

// showing individual restaurant data
const getRestaurant = async (req: Request, res: Response) => {
  try {
    console.log("getRestaurant invoked");
    const restaurantId = req.params.restaurantId;
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "restaurant not found" });
    }
    // res.json({ params: req.params });

    res.json(restaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};
const searchRestaurant = async (req: Request, res: Response) => {
  console.log("searchRestaurant invoked");
  try {
    const city = req.params.city; // thane

    const searchQuery = (req.query.searchQuery as string) || "";
    const selectedCuisines = (req.query.selectedCuisines as string) || "";
    const sortOption = (req.query.sortOption as string) || "lastUpdated";
    const page = parseInt(req.query.page as string) || 1;

    let query: any = city ? {} : {};
    query["city"] = new RegExp(city, "i");

    const cityCheck = await Restaurant.countDocuments(query);
    if (cityCheck === 0) {
      return res.status(404).json({
        data: [],
        pagination: {
          total: 0,
          pages: 1,
          pageSize: 1,
        },
      });
    }

    if (selectedCuisines) {
      // ["italian", "chinese", "indian"] = search restaurant
      const cuisinesArray = selectedCuisines
        .split(",")
        .map((cuisine) => new RegExp(cuisine, "i"));
      // it search restaurant having the selected cuisines
      query["cuisines"] = { $all: cuisinesArray };
    }

    if (searchQuery) {
      const searchRegex = new RegExp(searchQuery, "i");
      query["$or"] = [
        // search by restaurantName or cuisines
        { restaurantName: searchRegex },
        { cuisines: { $in: [searchRegex] } }, // in used to search any one match/cuisine and not for all the match
      ];
    }

    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    // sortOption = "lastupdated"
    const restaurants = await Restaurant.find(query)
      .sort({ [sortOption]: 1 })
      .skip(skip)
      .limit(pageSize)
      .lean(); //lean convert the mongoose documents into plane javascript object

    const total = await Restaurant.countDocuments(query);

    const response = {
      data: restaurants,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize), // 50 results, pageSize = 10 > pages > 5
      },
    };
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default {
  searchRestaurant,
  getRestaurant,
};
