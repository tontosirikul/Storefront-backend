import express, { Request, Response } from "express";
import { User, UserStore } from "../models/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import verifyAuthToken from "../middleware/verifyAuthToken";

dotenv.config();

const store = new UserStore();

const index = async (req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(parseInt(req.params.id));
    res.json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  };
  try {
    const newUser = await store.create(user);
    const userwithtoken = jwt.sign(
      { user: newUser },
      process.env.TOKEN_SECRET as jwt.Secret
    );
    const id = newUser.id;
    res.json({ userwithtoken, id });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const update = async (req: express.Request, res: express.Response) => {
  try {
    const user: User = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
    };

    const updatedUser = await store.update(parseInt(req.params.id), user);
    res.send(updatedUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deletedUser = await store.delete(parseInt(req.params.id));
    res.json(deletedUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  };
  try {
    const u = await store.authenticate(
      user.firstName,
      user.lastName,
      user.password
    );
    const userwithtoken = jwt.sign(
      { user: u },
      process.env.TOKEN_SECRET as jwt.Secret
    );
    res.json({ userwithtoken });
  } catch (error) {
    res.status(401);
    res.json(error);
  }
};

const user_routes = (app: express.Application): void => {
  app.post("/users", create);
  app.get("/users", verifyAuthToken, index);
  app.get("/users/:id", verifyAuthToken, show);
  app.put("/users/:id", verifyAuthToken, update);
  app.post("/users/auth", authenticate);
  app.delete("/users/:id", verifyAuthToken, destroy);
};

export default user_routes;
