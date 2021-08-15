import  express ,{Request,Response} from "express";
const routes = express.Router();

routes.get("/", (req: Request, res: Response): void => {
  res.send("main api");
});


export default routes;
