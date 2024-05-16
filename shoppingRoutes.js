/**Routes for shopping app */

import express from "express";
import { BadRequestError } from "./expressError.js";

const router = new express.Router();
import { Item } from "./models.js";

/**GET /items
 * get list of items
  { items: [
    { name: "popsicle", price: 1.45 },
    { name: "cheerios", price: 3.40 }
  ]}
 */
router.get("", function (req, res) {

  return res.json({ items: Item.all() });
});

/**POST /items
 * accepts JSON
 * add item to list of items and returns added item
    {name: "popsicle", price: 1.45} =>
    {added: {name: "popsicle", price: 1.45}}
 *  */
router.post("", function (req, res) {

  if (req.body === undefined) {
    throw new BadRequestError();
  }
  const newItem = { name: req.body.name, price: req.body.price };

  Item.add(newItem);

  return res.json({ added: newItem });
});

/**GET /items/:name
 * gets a single item by name
    {name: "popsicle", "price": 1.45}
 */
router.get("/:name", function (req, res) {

  console.log("param name", req.params.name);
  const item = Item.get(req.params.name);

  return res.json({ name: item.name, price: item.price });
});

/**PATCH /items/:name
 * accepts JSON
 * updates a single item and returns it
    {name: "new popsicle", price: 2.45} =>
    {updated: {name: "new popsicle", price: 2.45}}
 * */
router.patch("/:name", function (req, res) {
  if (req.body === undefined) {
    throw new BadRequestError();
  }

  const item = Item.get(req.params.name);
  console.log(item);

  //If no body is sent at all, result of req.body is undefined. Will need to check req.body === undefined
  // notes: put / patch requests - define what fields are required to be sent

  const itemNameUpdate = req.body.name || item.name;
  const itemPriceUpdate = req.body.price || item.price;

  const updated = Item.update(item, itemNameUpdate, itemPriceUpdate);

  return res.json({ updated }); //FIXME: be careful with object shorthand so that key matches requirements
});

/**DELETE /items/:name
 * deletes a single item */
router.delete("/:name", function (req, res) {
  const item = Item.get(req.params.name);

  Item.delete(item);

  return res.json({ message: "Deleted" });
});

export default router;