import { Document, Schema, model, Types } from 'mongoose';
import Category, { ICategory } from '../models/Category';

export async function findCategoryBySlugPath(slugPath:string) {
  const slugSegments = slugPath.split("/");

  let parentCategory = null;
  for (const slugSegment of slugSegments) {
   
    parentCategory = await Category.findOne({
      category_slug: slugSegment,
      status:true
    }).populate({
      path: 'children',
      match: { status: true }, // Query condition for populating only children with status: true
      select: '-__v', // Exclude __v from populated children
    }).exec();
    if (!parentCategory) {
      break;
    }
  }
  return parentCategory;
}