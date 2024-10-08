import { Schema, model, Types } from "mongoose";

const userSchema = new Schema({
    first_name: {type: String, required: true},
    last_name:{type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    photo: {type: String},
    google: {type: Boolean, default: false},
    online: {type: Boolean, default: false},
    verified: {type: Boolean, default: true},
    verified_code: {type: String}
}, {
    timestamps: true
});

const User = model("users", userSchema);

export default User;