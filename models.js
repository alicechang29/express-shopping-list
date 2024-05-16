import { NotFoundError } from "./expressError.js";
import { items } from "./fakeDb.js";

/** Simple datastore for shopping items; only stores in memory. */

//FIXME: instead can import a db file

class Item {

  static items = [
    { name: "popsicle", price: 1.45 },
    { name: "cheerios", price: 3.40 }
  ];

  static _get(name) {
    for (let item of this.items) {
      if (item.name === name) {
        return item;
      }
    }
    throw new NotFoundError(`No such item: ${name}`);
  }

  static _getItemIndex(item) {
    return this.items.indexOf(item);
  }

  /** Returns list of all items. */
  static all() {
    return this.items;
  }

  /** Find item by name; returns item or throws error. */
  static get(name) { //given an item name

    return Item._get(name);
  }

  /** Add new item and return item. */
  static add(item) {
    this.items.push(item);
    return item;
  }

  /** Updates item and return item. */
  static update(item, itemName, itemPrice) {

    item.name = itemName;
    item.price = itemPrice;

    return item;
  }

  /** Delete item; returns true or throws if cannot find. */
  static delete(item) {

    const itemIndex = Item._getItemIndex(item);

    this.items.splice(itemIndex, 1);

    return true;
  }


}


export { Item };
