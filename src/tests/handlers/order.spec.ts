import supertest from "supertest";
import app from "../../index";
import { Order } from "../../models/order";
const request = supertest(app);

describe("🏁 testing endpoint (Orders)", () => {
  const first_Order: Order = {
    status: "active",
    user_id: 1,
  };
  const second_Order: Order = {
    status: "complete",
    user_id: 1,
  };
  let token: string;
  let id_tobe_delete: number;
  let id_tobe_delete_product: number;
  beforeAll(async () => {
    const response = await request.post("/users").send({
      firstName: "order_test",
      lastName: "test",
      password: "17",
    });
    token = response.body.userwithtoken;
    id_tobe_delete = response.body.id;
    const response_product = await request
      .post("/products")
      .send({
        name: "product_mock",
        price: 20,
      })
      .set("Authorization", "bearer " + token);
    id_tobe_delete_product = response_product.body.id;
  });
  it("should create first order (active)", async () => {
    const response = await request
      .post("/orders")
      .send(first_Order)
      .set("Authorization", "bearer " + token)
      .expect(200);
    expect(response.body.status).toEqual("active");
  });

  it("should get all orders", async () => {
    const response = await request.get("/orders").expect(200);
    expect(response.body[0]).toEqual({
      id: 1,
      status: "active",
      user_id: 1,
    });
  });

  it("should get first order with id 1", async () => {
    const response = await request.get("/orders/1").expect(200);
    expect(response.body.id).toEqual(1);
    expect(response.body.status).toEqual("active");
  });

  it("should update first order to be second order", async () => {
    const response = await request
      .put("/orders/1")
      .send(second_Order)
      .set("Authorization", "bearer " + token)
      .expect(200);
    expect(response.body.id).toEqual(1);
    expect(response.body.status).toEqual("complete");
  });

  it("should add products to this order", async () => {
    const response = await request
      .post("/orders/1/products")
      .send({ product_id: id_tobe_delete_product, quantity: "300" })
      .set("Authorization", "bearer " + token)
      .expect(200);
    expect(response.body.order_id).toEqual(1);
    expect(response.body.product_id).toEqual(id_tobe_delete_product);
  });

  it("should remove products to this order", async () => {
    const response = await request
      .delete("/orders/1/products/1")
      .set("Authorization", "bearer " + token)
      .expect(200);
    expect(response.body.order_id).toEqual(1);
    expect(response.body.product_id).toEqual(id_tobe_delete_product);
  });

  it("should get orders of this user", async () => {
    const response = await request
      .get(`/orders-by-user/${id_tobe_delete}`)
      .set("Authorization", "bearer " + token)
      .expect(200);
    expect(response.body[0].id).toEqual(1);
    expect(response.body[0].status).toEqual("complete");
  });

  it("should delete edited order with id 1", async () => {
    const response = await request
      .delete("/orders/1")
      .set("Authorization", "bearer " + token)
      .expect(200);
    expect(response.body.id).toEqual(1);
    expect(response.body.status).toEqual("complete");
  });

  afterAll(async () => {
    await request
      .delete(`/products/${id_tobe_delete_product}`)
      .set("Authorization", "bearer " + token);
    await request
      .delete(`/users/${id_tobe_delete}`)
      .set("Authorization", "bearer " + token);
  });
});
