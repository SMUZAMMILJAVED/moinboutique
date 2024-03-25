const { Schema, model, models, default: mongoose } = require("mongoose");

const OrderSchema=new Schema({
    line_items:Object,
    name:String,
    number:String,
    city:String,
    postalCode:String,
    streetAddress:String,
    country:String,
    paid:Boolean,
    total:Number,
    },{
      timestamps:true,
    
});
export const Order = models?.Order||model("Order",OrderSchema);
   