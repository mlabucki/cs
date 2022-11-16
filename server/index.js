const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const SeedsData = require("./SeedDB.js");

const productRoute = require("./Routes/ProductRoutes");
const userRouter = require("./Routes/UserRoutes");
const orderRouter = require("./Routes/OrderRoutes");
const { errorHandler, notFound } = require("./Middleware/errorMiddleware");


dotenv.config();
connectDB();
const app = express();
app.use(express.json());

app.use(cors("*"));
//API
app.use("/api/seed", SeedsData)
app.use("/api/products", productRoute);
app.use("/api/users/", userRouter);
app.use("/api/products/", productRoute);
app.use("/api/orders", orderRouter)


//Error
app.use(notFound);
app.use(errorHandler)







const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
