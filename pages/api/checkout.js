import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Products";

export default async function handle(req, res) {
  if (req.method !== "POST") {
    res.json("should be a POST request");
    return;
  }
  const {
    name,
    number,
    city,
    postalCode,
    streetAddress,
    country,
    cartProducts,
    total,
  } = req.body;
  await mongooseConnect();
  const productsIds = cartProducts;
  const uniqueIds = [...new Set(productsIds)];
  const productsInfos = await Product.find({ _id: uniqueIds });
  let line_items = [];

  // let totalPrice = 0;//  

  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(
      (p) => p._id.toString() === productId
    );
    const quantity = productsIds.filter((id) => id === productId)?.length || 0;
    if (quantity > 0 && productInfo) {

      const productPrice = quantity * productInfo.price;
      // totalPrice += productPrice; // Add product price to total price

      line_items.push({
        quantity,
        price_data: {
          currency: "USD",
          product_data: { name: productInfo.title },

          unit_amount:productPrice,

          // unit_amount: quantity * productInfo.price * 100,
        },
      });
    }
  }
  const orderDoc = await Order.create({
    line_items,
    name,
    number,
    city,
    postalCode,
    streetAddress,
    country,
    paid: false,
    total:total+250,
    // total: totalPrice, // Include total price in the order document
  });
  //check start
  res.status(201).json({ success: true, message: "Order created successfully" });
  //check end
}
