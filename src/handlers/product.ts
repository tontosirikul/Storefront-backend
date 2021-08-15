import express, { Request, Response } from "express";
import verifyAuthToken from "../middleware/verifyAuthToken";
import { Product, ProductsStore } from "../models/product";

const store = new ProductsStore();

const index = async (req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(parseInt(req.params.id));
    res.json(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const create = async (req: Request, res: Response) => {
  const product: Product = {
    name: req.body.name,
    price: parseInt(req.body.price),
  };
  try {
    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const update = async (req: express.Request, res: express.Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
    };

    const updatedProduct = await store.update(parseInt(req.params.id), product);
    res.send(updatedProduct);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(parseInt(req.params.id));
    res.json(deleted);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const products_routes = (app: express.Application): void => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", verifyAuthToken, create);
  app.put("/products/:id", verifyAuthToken, update);
  app.delete("/products/:id", verifyAuthToken, destroy);
};

export default products_routes;
