import { OrderStore } from "../../models/order";

const store = new OrderStore();

describe("🏁 testing model (Order)", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });

  it("should have a update method", () => {
    expect(store.update).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(store.delete).toBeDefined();
  });
  it("should have a add product method", () => {
    expect(store.addProduct).toBeDefined();
  });
  it("should have a remove product method", () => {
    expect(store.removeProduct).toBeDefined();
  });
  it("should have a get all orders from user method", () => {
    expect(store.orderByUser).toBeDefined();
  });
});
