const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
      // unique: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },
    city: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      // unique: false,
      validate: {
        validator: (email) => /(.+)@(.+){2,}\.(.+){2,}/.test(email),
        message: (props) => `${props.value} is a invalid email`,
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 10,
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      enum: ["normal", "superadmin", "admin"],
      default: "normal",
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    emailConfirmedAt: {
      type: Date,
      required: false,
    },
    tokenEmailConfirm: {
      type: String,
      // expires
    },
    emailTokenExpiresAt: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.set("toJSON", {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

// Y ahora creamos el model, asignandole el nombre de la collección y le pasamos el esquema creado antes
const User = mongoose.model("User", UserSchema);

module.exports = User;
