import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import productRoute from "./routes/product.route.js"
import orderRoute from "./routes/order.route.js"
import paymentRoute from "./routes/payment.route.js"
import reviewRoute from "./routes/review.route.js"
dotenv.config({});

//call the database
connectDB();

const app = express();

// app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use((req, res, next) => {
  if (req.originalUrl === "/api/v1/purchase/webhook") return next();
  express.json()(req, res, next);
});

const PORT = process.env.PORT || 3000;



//apis
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product",productRoute)
app.use("/api/v1/order",orderRoute)
app.use("/api/v1/purchase",paymentRoute );
app.use("/api/v1/review",reviewRoute)



app.listen(PORT, () => {
  console.log(`Server listen at port no: ${PORT}`);
});
