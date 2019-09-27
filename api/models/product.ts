import { Document, model, Model, Schema } from 'mongoose';

interface ProductModel extends Document {
  name: string;
  price: number;
  image?: string;
}

const ProductSchema: Schema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: false },
});

const Product: Model<ProductModel> = model('Product', ProductSchema);

export default Product;
