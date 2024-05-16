import { describe, test, expect, beforeEach, afterEach } from "vitest";
import request from "supertest";

process.env.NODE_ENV = "test";

import app from "../app.js";

import { items } from "../fakeDb.js";

const pizza = { name: "Pizza", price: "$1.99" };

//Before each test, add a new item.
beforeEach(function () {
  items.push(pizza);
});

//After each test, delete the item
afterEach(function () {
  items.length = 0;
});

/** GET /items - returns `{items: [item, ...]}` */
describe("GET /items", function () {
  test("Gets a list of items", async function () {
    const resp = await request(app).get(`/items`);

    expect(resp.body).toEqual({ items: [pizza] });
  });
});
// end

/** GET /items/:name - returns `{ name: "Pizza", price: "$1.99" }` */
describe("GET /items/:name", function () {
  test("Gets a single item", async function () {
    const resp = await request(app).get(`/items/${pizza.name}`);

    expect(resp.body).toEqual(pizza);
  });

  test("Responds with 404 if can't find item"), async function () {
    const resp = await request(app).get(`/items/missing`);
    expect(resp.statusCode).toEqual(404);
  };
});

/** POST /items - create item from data; return `{item: item}` */

describe("POST /items", function () {
  test("Create a new item", async function () {
    const resp = await request(app)
      .post(`/items`)
      .send({ name: "Cherry", price: 0 });

    expect(resp.body).toEqual({ added: { name: "Cherry", price: 0 } });
  });

  test("Responds with 400 if empty body"), async function () {
    const resp = await request(app)
      .post(`/items`)
      .send();

    expect(response.statusCode).toEqual(400);
  };
});

//TODO: what is difference between starting test with test vs it?


//TODO: add Patch and Delete tests (4 more)