import express from "express";

import cookieParser from "cookie-parser";

import dotenv from "dotenv";
import cors from "cors";
import router from "./controllers/index.controller.mjs";
import pool from "./connections/mysql.connection.mjs";

dotenv.config();

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
  
  app.use(cookieParser("my-secret"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(router);

  createTableIfExist();

  return app;
}

const createTableIfExist = async () => {
  try {
    const connection = await pool.getConnection();

    await connection.query(`
    CREATE DATABASE IF NOT EXISTS carbon_neutral_app`)
    
    // Create users table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255),
        password VARCHAR(255),
        email VARCHAR(255),
        avatar VARCHAR(255),
        points INT,
        total_donations INT,
        isAdmin BOOLEAN
      )
    `);

    // Create products table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        description TEXT,
        image_url VARCHAR(255),
        point_cost INT,
        quantity INT
      )
    `);

    // Create claim_product_history table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS claim_product_history (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        product_id INT,
        quantity INT,
        claimAt TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
      )
    `);

    // Create blogs table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS blogs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        admin_id INT,
        title VARCHAR(255),
        thumbnail VARCHAR(255),
        content TEXT,
        view_count INT,
        liked_count INT,
        FOREIGN KEY (admin_id) REFERENCES users(id)
      )
    `);

    // Create comments table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS comments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        blog_id INT,
        user_id INT,
        content TEXT,
        createdAt TIMESTAMP,
        FOREIGN KEY (blog_id) REFERENCES blogs(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    // Create campaigns table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS campaigns (
        id INT AUTO_INCREMENT PRIMARY KEY,
        image_url VARCHAR(255),
        title TEXT,
        content TEXT,
        total_donations FLOAT,
        donation_goal FLOAT
      )
    `);

    connection.release();
    console.log("Tables created or verified successfully");
  } catch (error) {
    console.error("Error setting up tables:", error.message);
  }
};
