import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoute.js"
import cors from "cors";

//configure env
dotenv.config();

//databse config
connectDB();

//rest object
const app = express();

//middelwares
// app.use(cors());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use('/api/v1/cart',cartRoutes);

//rest api
app.get("/", (req, res) => {
  res.json("Hello");
  // res.send("<h1>Welcome to ecommerce app</h1>");
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  app.get('*', (req, res) => {
    res.redirect('/');
  });
});

//PORT
const PORT = process.env.PORT || 8080;
// const server = http.createServer(app);
//run listen
// server.listen(PORT, () => {
//   console.log(`Server is listening on port ${PORT}`);
// });
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
