import { Document, model, Model, Schema } from 'mongoose';

interface UserModel extends Document {
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  _id: Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: { type: String, required: true }
});

const User: Model<UserModel> = model('User', UserSchema);

export default User;
