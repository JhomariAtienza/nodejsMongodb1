// models/cart.js
const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;
const CartItem = require("./cart-item");

class Cart {
  constructor(id, userId) {
    this._id = id;
    this.userId = new mongodb.ObjectId(userId);
    this.items = []; // Initialize the items property as an empty array
  }
  
  save() {
    const db = getDb();
    let dbOperation;
    if (this._id) {
      // Update existing cart
      dbOperation = db.collection("carts").updateOne({ _id: this._id }, { $set: this });
    } else {
      // Insert new cart
      dbOperation = db.collection("carts").insertOne(this)
        .then((result) => {
          this._id = result.insertedId;
        });
    }
    return dbOperation
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  addItem(productId, quantity) {
    const cartItem = new CartItem(null, quantity, this._id, productId);
    return cartItem.save()
      .then(result => {
        console.log('Cart item saved:', result);
        // Optionally, you can return the saved cart item
        return cartItem;
      })
      .catch(err => {
        console.log('Error saving cart item:', err);
        throw err;
      });
  }
  

  static findById(cartId) {
    const db = getDb();
    return db
      .collection("carts")
      .findOne({ _id: new mongodb.ObjectId(cartId) });
  }

  
}

module.exports = Cart;
