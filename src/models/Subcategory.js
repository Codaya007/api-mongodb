const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const SubcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
      unique: true,
    },
    category: {
      type: ObjectId,
      ref: "Subcategory",
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

SubcategorySchema.set("toJSON", {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Subcategory = mongoose.model("Subcategory", SubcategorySchema);

module.exports = Subcategory;
