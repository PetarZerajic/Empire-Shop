import fs from "fs";
import "dotenv/config.js";
import { products } from "./products";
import { Prouduct } from "../models/productModel";
import { User } from "../models/userModel";
import { connectToDb } from "../../config/db";

connectToDb();
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));

const importData = async () => {
  try {
    await Prouduct.create(products, { validateBeforeSave: false });
    await User.create(users, { validateBeforeSave: false });
    console.log("Data successfully loaded");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Prouduct.deleteMany();
    await User.deleteMany();
    console.log("Data successfully deleted");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
