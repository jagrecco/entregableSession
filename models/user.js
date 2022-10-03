/* import mongoose from "mongoose"; */
import mongoose, { Schema } from 'mongoose';
/* import { mongoose, Schema } from "mongoose"; */

const userSchema = new Schema({
  username: { type: String, required: true, max: 100 },  
  email: { type: String, required: true, max: 100 },
  password: { type: String, required: true, max: 100 },
});

/* const UserSchema = new mongoose.Schema({
  mail: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  
}); */

/* const model = mongoose.model('User', userSchema);

export const schema = model.schema;
export default model; */
//mongoose.models.Customer || mongoose.model('Customer', customerSchema);
/* export default mongoose.model("User", userSchema); */

export default mongoose.models.User || mongoose.model('User', userSchema);