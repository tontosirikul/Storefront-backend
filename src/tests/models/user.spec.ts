import { UserStore } from "../../models/user";

const store = new UserStore();

describe("🏁 testing model (User)", () => {
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
  it("should have a authenticate method", () => {
    expect(store.authenticate).toBeDefined();
  });
});
