/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import client from "../database";

export type Product = {
  id?: number;
  name: string;
  price: number;
};

export class ProductsStore {
  async index(): Promise<Product[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM products;";
      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get products ${error}`);
    }
  }
  async show(id: number): Promise<Product> {
    try {
      const sql = "SELECT * FROM products WHERE id=($1)";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }
  async create(b: Product): Promise<Product> {
    try {
      const sql =
        "INSERT INTO products (name,price) VALUES($1, $2) RETURNING *";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [b.name, b.price]);

      const product = result.rows[0];

      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not add new product ${b.name}. Error: ${err}`);
    }
  }
  async update(id: number, b: Product): Promise<Product> {
    try {
      const sql =
        "UPDATE products SET name = $1, price = $2 WHERE id=($3) RETURNING *";
      // @ts-ignore
      const conn = await client.connect();
      const result = await conn.query(sql, [b.name, b.price, id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update product ${b.name}. Error: ${err}`);
    }
  }
  async delete(id: number): Promise<Product> {
    try {
      const sql = "DELETE FROM products WHERE id=($1) RETURNING *";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      // const todo = result.command.concat(" "+result.rowCount+" rows");
      conn.release();
      const product = result.rows[0];

      return product;
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
}
