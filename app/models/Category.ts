// src/models/categoryModel.ts
import mongoose, { Schema, Document,Types } from 'mongoose';

export interface ICategory extends Document {
  category_name: string;
  category_slug: string;
  hasChildren?: boolean;
  parent?:Types.ObjectId;
  children?: ICategory[];
  status:boolean;
}

// const categorySchema = new Schema<ICategory>({
//   category_name: { type: String, required: true },
//   category_slug: { type: String, required: true,unique:true },
//   hasChildren: { type: Boolean,required:true,default:false },
//   parent: { type: Schema.Types.ObjectId, ref: 'Category',default:'root'},
//   children: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
//   status:{type:Boolean,required:true,default:true}
// });

const categorySchema = new Schema<ICategory>({
  category_name: { type: String, required: true },
  category_slug: { type: String, required: true, unique: true },
  hasChildren: { type: Boolean, required: true, default: false },
  parent: { 
      type: Schema.Types.Mixed,
      ref: 'Category',
      validate: {
          validator: function(value: string | number | mongoose.mongo.BSON.ObjectId | Uint8Array | mongoose.mongo.BSON.ObjectIdLike) {
              // Allow either ObjectId or 'root' string
              return value === 'root' || mongoose.Types.ObjectId.isValid(value);
          },
          message: props => `${props.value} is not a valid ObjectId or 'root'`,
      },
      default: 'root'
  },
  children: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  status: { type: Boolean, required: true, default: true }
});

const Category = mongoose.model<ICategory>('Category', categorySchema);

export default Category;
