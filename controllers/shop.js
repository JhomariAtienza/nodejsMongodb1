const Product = require("../models/product");
const Cart = require("../models/cart");
const CartItem = require("../models/cart-item");
const mongodb = require("mongodb");
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
  console.log("body", req.body);
  console.log("params", req.params);
  const prodId = req.params.productId;
  console.log("prodId", prodId);
  Product.findById(prodId)
    .then((product) => {
      console.log(product);
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  CartItem.fetchAll()
    .then((cartItems) => {
      const productIds = cartItems.map(item => item.productId);

      return Product.find({_id: { $in: productIds }})
        .then(products => { 
          const cartItemsWithProducts = cartItems.map(item => {
            const product = products.find(prod => prod._id.toString() === item.productId.toString());
            console.log(product);
            return {
              ...item,
              product: product || {} // Attach product to cart item or an empty object if not found
            };
          }
        );
        console.log(cartItemsWithProducts);
          res.render("shop/cart", {
            path: "/cart",
            pageTitle: "Your Cart",
            products: cartItemsWithProducts,
          });
        });
    })
    .catch((err) => console.log(err));
}

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  const cartId = '667badfd8855feb712e26c0f'; // Static cartId for demonstration


  CartItem.findOne(cartId, productId)
    .then(cartItem => {
      if (cartItem) {
        const updatedCartItem = new CartItem(
          cartItem._id,
          cartItem.quantity + 1,
          cartItem.cartId,
          cartItem.productId
        );
        return updatedCartItem.save(); 
      } else {
        const newCartItem = new CartItem(null, 1, cartId, productId);
        return newCartItem.save(); 
      }
    })
    .then(result => {
      console.log('Cart item saved/updated:', result);
      res.redirect('/cart'); 
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
};


exports.postCartDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  console.log("productId", productId);
  CartItem.deleteById(productId)
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      return req.user
        .createOrder()
        .then((order) => {
          return order.addProducts(
            products.map((product) => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          );
        })
        .catch((err) => console.log(err));
    })
    .then((result) => {
      return fetchedCart.setProducts(null);
    })
    .then((result) => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({ include: ["products"] })
    .then((orders) => {
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders,
      });
    })
    .catch((err) => console.log(err));
};
