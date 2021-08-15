/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import client from "../database";

export type Order = {
  id?: number;
  status: string;
  user_id: number;
};

export type Order_product_list = {
  id?: number;
  quantity: number;
  product_id: number;
  order_id: number;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM orders";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get order ${error}`);
    }
  }
  async show(id: number): Promise<Order> {
    try {
      const sql = "SELECT * FROM orders WHERE id=($1)";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }
  async create(b: Order): Promise<Order> {
    try {
      const sql =
        "INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [b.status, b.user_id]);

      const order = result.rows[0];

      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not add new order ${b.id}. Error: ${err}`);
    }
  }

  async update(id: number, b: Order): Promise<Order> {
    try {
      const sql =
        "UPDATE orders SET status = $1, user_id = $2 WHERE id=($3) RETURNING *";
      // @ts-ignore
      const conn = await client.connect();
      const result = await conn.query(sql, [b.status, b.user_id, id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update todo ${b.id}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Order> {
    try {
      const sql = "DELETE FROM orders WHERE id=($1) RETURNING *";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();
      const order = result.rows[0];
      return order;
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }
  async addProduct(b: Order_product_list): Promise<Order> {
    try {
      const sql =
        "INSERT INTO order_product_lists (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *";
      //@ts-ignore
      const conn = await client.connect();
      const result = await conn.query(sql, [
        b.quantity,
        b.order_id,
        b.product_id,
      ]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${b.product_id} to order ${b.order_id}: ${err}`
      );
    }
  }

  async removeProduct(
    order_id: number,
    product_id: number
  ): Promise<Order_product_list> {
    try {
      const sql =
        "DELETE FROM order_product_lists WHERE order_id=$1 and product_id=$2 RETURNING *";
      //@ts-ignore
      const conn = await client.connect();
      const result = await conn.query(sql, [order_id, product_id]);
      conn.release();
      const orderProduct = result.rows[0];
      return orderProduct;
    } catch (err) {
      throw new Error(
        `Could not delete prodyc ${product_id} of order ${order_id}. Error: ${err}`
      );
    }
  }

  async orderByUser(id: number): Promise<Order> {
    try {
      const sql = "SELECT * FROM orders WHERE user_id = $1";
      //@ts-ignore
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      const allOrders = result.rows;
      return allOrders;
    } catch (err) {
      throw new Error(`Could not get all orders of user id: ${id} : ${err}`);
    }
  }
}
