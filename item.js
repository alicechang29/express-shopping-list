import { NotFoundError } from "./expressError.js";
import { items } from "./fakeDb.js";

/** Simple datastore for shopping items; only stores in memory. */


class Item {

  //adding a new item to my list of items in fakeDB file
  constructor(name, price) {
    this.name = name;
    this.price = price;

    items.push(this);
  }


  static _get(name) {
    for (let item of items) {
      if (item.name === name) {
        return item;
      }
    }
    throw new NotFoundError(`No such item: ${name}`);
  }

  static _getItemIndex(item) {
    return items.indexOf(item);
  }

  /** Returns list of all items. */
  static all() {
    return items;
  }

  /** Find item by name; returns item or throws error. */
  static get(name) { //given an item name

    return Item._get(name);
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

    items.splice(itemIndex, 1);

    return true;
  }


}

export default Item;
