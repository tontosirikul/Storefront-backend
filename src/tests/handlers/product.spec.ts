import supertest from "supertest";
import app from "../../index";
import { Product } from "../../models/product";
const request = supertest(app);

describe("🏁 testing endpoint (Products)", () => {
  const milk: Product = {
    name: "milk",
    price: 20,
  };

  const expensive_milk: Product = {
    name: "expensive_milk",
    price: 30,
  };
  let token: string;
  let id_tobe_delete: number;
  beforeAll(async () => {
    const response = await request.post("/users").send({
      firstName: "product_test",
      lastName: "test",
      password: "17",
    });
    token = response.body.userwithtoken;
    id_tobe_delete = response.body.id;
  });
  it("should create milk product", async () => {
    const response = await request
      .post("/products")
      .send(milk)
      .set("Authorization", "bearer " + token)
      .expect(200);
    expect(response.body.name).toEqual("milk");
  });

  it("should get all products", async () => {
    const response = await request.get("/products").expect(200);
    expect(response.body[0]).toEqual({
      id: 2,
      name: "milk",
      price: 20,
    });
  });

  it("should get milk product with id 1", async () => {
    const response = await request.get("/products/2").expect(200);
    expect(response.body.id).toEqual(2);
    expect(response.body.name).toEqual("milk");
  });

  it("should update milk to be expensive milk", async () => {
    const response = await request
      .put("/products/2")
      .send(expensive_milk)
      .set("Authorization", "bearer " + token)
      .expect(200);
    expect(response.body.id).toEqual(2);
    expect(response.body.price).toEqual(30);
  });

  it("should delete expensive milk with id 1", async () => {
    const response = await request
      .delete("/products/2")
      .set("Authorization", "bearer " + token)
      .expect(200);
    expect(response.body.id).toEqual(2);
    expect(response.body.name).toEqual("expensive_milk");
  });
  afterAll(async () => {
    await request
      .delete(`/users/${id_tobe_delete}`)
      .set("Authorization", "bearer " + token);
  });
});
