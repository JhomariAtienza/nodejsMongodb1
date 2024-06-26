const mongodb = require('mongodb');
const getDb = require("../util/database").getDb;

class CartItem {
  constructor(id, quantity, cartId, productId) {
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.quantity = quantity;
    this.cartId = new mongodb.ObjectId(cartId);
    this.productId = new mongodb.ObjectId(productId);
  }

  save() {
    const db = getDb();
    let dbOperation;
    if (this._id) {
      // Update existing cart item
      dbOperation = db.collection('cartItems').updateOne({ _id: this._id }, { $set: this });
    } else {
      // Insert new cart item
      dbOperation = db.collection('cartItems').insertOne(this);
    }
    return dbOperation
      .then(result => {
        console.log(result);
        return result;
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  }

  static fetchAll() {
    const db = getDb();
    return db.collection('cartItems')
      .find()
      .toArray()
      .then(cartItems => {
        return cartItems;
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  }

  static findByCartId(cartId) {
    const db = getDb();
    return db.collection('cartItems')
      .find({ cartId: new mongodb.ObjectId(cartId) })
      .toArray()
      .then(cartItems => {
        return cartItems;
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  }

  static deleteById(id) {
    const db = getDb();
    return db.collection('cartItems')
      .deleteOne({ productId: new mongodb.ObjectId(id) })
      .then(result => {
        console.log('Deleted');
        return result;
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  }

  static findOne(cartId, productId) {
    const db = getDb();
    return db
      .collection('cartItems')
      .findOne({ cartId: new mongodb.ObjectId(cartId), productId: new mongodb.ObjectId(productId) });
  }
}

module.exports = CartItem;
