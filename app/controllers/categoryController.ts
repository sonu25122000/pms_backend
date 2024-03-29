import { Request, Response } from "express";
import Category, { ICategory } from "../models/Category";
import { findCategoryBySlugPath } from "../utils/category";
import { isValidObjectId } from "mongoose";

export const addCategory = async (req: Request, res: Response) => {
  try {
    const existingCategory = await Category.findOne({
      category_slug: req.body.category_slug,
    });

    if (existingCategory) {
      return res.status(404).json({
        success: false,
        message: "Category already exist with given slug",
      });
    }

    const category = new Category({
      ...req.body,
      status: true, // Set default status to true (active)
    });

    let parent;
    if (req.body.parent) {
      parent = await Category.findById(req.body.parent);
      if (!parent) {
        return res.status(404).json({
          success: false,
          message: "Parent not found with parent id",
        });
      }
      parent.hasChildren = true;
      parent?.children?.push(category);
    }
    await category.save();
    await parent?.save();
    res.status(201).json({
      success: true,
      message: "Category added successfully",
      categoryId: category._id,
    });
  } catch (error) {
    console.error("Error in adding Categories:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllCategory = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find({ status: true })
      .select("-__v")
      .populate({
        path: "children",
        match: { status: true }, // Query condition for populating only children with status: true
        select: "-__v -children", // Exclude __v from populated children
      });

    res.status(200).json({
      success: true,
      message: "Successfully fetched all details",
      data: categories,
    });
  } catch (error) {
    console.error("Error in fetching category details:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getSingleCategory = async (req: Request, res: Response) => {
  try {
    if (!isValidObjectId(req.params.categoryId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    const category = await Category.findOne({
      _id: req.params.categoryId,
      status: true,
    }).select("-children -__v");
    if (!category) {
      res.status(404).json({
        success: false,
        message: "Category not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Category data fetched successfully",
        data: category,
      });
    }
  } catch (error) {
    console.error("Error in fetching category detail:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

async function updateParentCategory(category: ICategory | null) {
  if (!category || !category.parent) {
    return;
  }

  const parent = await Category.findOne({ status: true, _id: category.parent })
    .select("-__v")
    .populate({
      path: "children",
      match: { status: true },
      select: "-__v",
    });
  console.log(parent);

  if (parent) {
    if ((parent.children?.length ?? 0) === 0) {
      parent.hasChildren = false;
      await parent.save();
    } else {
      parent.hasChildren = true;
      await parent.save();
    }
  }
  return;
}
export const updateCategory = async (req: Request, res: Response) => {
  try {
    if (!isValidObjectId(req.params.categoryId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    const cat = await Category.findById(req.params.categoryId);
    if (!cat) {
      return res.status(404).json({
        success: false,
        message: "Category Not Found with Given ID",
      });
    }

    const category = await Category.findByIdAndUpdate(
      req.params.categoryId,
      req.body,
      { new: true }
    );
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });

    if (category) {
      updateParentCategory(category);
    }
  } catch (error) {
    console.error("Error in updating category detail:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    if (!isValidObjectId(req.params.categoryId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }
    const category = await Category.findByIdAndUpdate(req.params.categoryId, {
      status: false,
    });
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    updateParentCategory(category);
    return res.status(200).json({
      success: true,
      message: "Successfully deleted category",
    });
  } catch (error) {
    console.error("Error in updating category detail:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getCategoryBasedOnSlug = async (req: Request, res: Response) => {
  try {
    if (!req.params[0]) {
      return res.status(400).json({
        success: false,
        message: "Category Slug Not Found",
      });
    }
    const foundCategory = await findCategoryBySlugPath(req.params[0]);

    if (foundCategory) {
      res.json({
        success: true,
        message: "Category data fetched successfully",
        data: foundCategory,
      });
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    console.error("Error in fetching category detail vaibhav:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
