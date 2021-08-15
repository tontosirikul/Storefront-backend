import express, { Request, Response } from "express";
import cors from "cors";
import routes from "./routes/api";
import products_routes from "./handlers/product";
import user_routes from "./handlers/user";
import orders_routes from "./handlers/order";
const app = express();

const port = 3000;

app.use(express.json());
app.use(cors());

app.use("/api", routes);

app.get("/", (req: Request, res: Response): void => {
  res.send("Home");
});

products_routes(app);
user_routes(app);
orders_routes(app);

app.get("*", (req: Request, res: Response): void => {
  res.send("No route");
});

app.listen(port, (): void => {
  console.log(`server started at localhost:${port}`);
});

export default app;
