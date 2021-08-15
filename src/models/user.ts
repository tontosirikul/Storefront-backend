/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import client from "../database";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const saltRounds: string = process.env.saltRounds as string;
const bcrypt_code: string = process.env.bcrypt_code as string;

export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = "SELECT firstName FROM users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get user ${error}`);
    }
  }
  async show(id: number): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE id=($1)";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }
  async create(b: User): Promise<User> {
    try {
      const sql =
        "INSERT INTO users (firstName , lastName, password_digest) VALUES($1, $2, $3) RETURNING *";
      // @ts-ignore
      const conn = await client.connect();
      const hash = bcrypt.hashSync(
        b.password + bcrypt_code,
        parseInt(saltRounds)
      );

      const result = await conn.query(sql, [b.firstName, b.lastName, hash]);

      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(
        `Could not add new user ${b.firstName} ${b.lastName} . Error: ${err}`
      );
    }
  }
  async update(id: number, b: User): Promise<User> {
    try {
      const sql =
        "UPDATE users SET firstName = $1, lastName = $2, password_digest = $3 WHERE id=($4) RETURNING *";
      // @ts-ignore
      const conn = await client.connect();
      const result = await conn.query(sql, [
        b.firstName,
        b.lastName,
        b.password,
        id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not update user ${b.firstName} ${b.lastName}. Error: ${err}`
      );
    }
  }
  async delete(id: number): Promise<User> {
    try {
      const sql = "DELETE FROM users WHERE id=($1) RETURNING *";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();
      const user = result.rows[0];

      return user;
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }
  async authenticate(
    firstName: string,
    lastName: string,
    password: string
  ): Promise<User | null> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql =
        "SELECT firstName, lastName, password_digest FROM users WHERE firstName=($1) and lastName=($2)";

      const result = await conn.query(sql, [firstName, lastName]);

      if (result.rows.length) {
        const user = result.rows[0];
        if (bcrypt.compareSync(password + bcrypt_code, user.password_digest)) {
          return user;
        }
      }
      throw new Error("user not found");
    } catch (error) {
      throw new Error("user not found");
    }
  }
}
