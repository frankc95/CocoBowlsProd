import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

// call dotenv
dotenv.config();

// call connectDB
connectDB();

// import func
const importData = async () => {
  try {
    // first remove anything that may already be there
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // define const that holds all users
    const createdUsers = await User.insertMany(users);

    // assign admin user
    const adminUser = createdUsers[0]._id;

    // map throught products, assing it to const and link adminuser
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // add all products
    await Product.insertMany(sampleProducts);

    // success message
    console.log('Data Imported!'.green.inverse);
    // exit with success
    process.exit();
  } catch (error) {
    // error message
    console.error(`${error}`.red.inverse);
    // exit with failure
    process.exit(1);
  }
};

// Delete func
const destroyData = async () => {
  try {
    // first remove anything that may already be there
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // success message
    console.log('Data Destroyed!'.red.inverse);
    // exit with success
    process.exit();
  } catch (error) {
    // error message
    console.error(`${error}`.red.inverse);
    // exit with failure
    process.exit(1);
  }
};

// if -d destroy else import
// scripts defined in package.json
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
