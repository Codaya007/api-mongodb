const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

// Creamos el esquema que tendrá cada documento de la collección Producto
const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 32,
    },
    quantity: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    subcategory: {
      type: ObjectId,
      ref: "Subcategory",
      required: true,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    gender: {
      type: String,
      enum: ["M", "F", "U"],
      required: true,
      default: "U",
    }
  },
  {
    timestamps: true,
  }
);

ProductSchema.set("toJSON", {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});


// Y ahora creamos el model, asignandole el nombre de la collección y le pasamos el esquema creado antes
const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
