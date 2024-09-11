import express from "express";
import cors from "cors";
import { router } from "./routes";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandle";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://frontend-pied-kappa-64.vercel.app/"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true
  })
);

app.use(express.json());
app.use(router);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
