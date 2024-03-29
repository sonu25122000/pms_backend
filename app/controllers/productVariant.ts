import { Request, Response } from "express";
import ProductVariant from "../models/ProductVariant";

export const addProductVarient = async (req: Request, res: Response) => {
  try {
    const newVariant = new ProductVariant({
      ...req.body,
    });
    newVariant.save();
    return res.status(200).json({
      success: true,
      message: "Successfully added Product Variant",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllProductVariant = async (req: Request, res: Response) => {
  try {
    const productVariant = await ProductVariant.find({ isVisibility: true })
      .populate({
        path: "option_value",
        match: { isVisibility: true }, // Populate option_value only when isVisibility is true
      })
      .exec();

    if (!productVariant) {
      return res.status(404).json({
        success: false,
        message: "Product Variant Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully Fetched Product Variant Details",
      data: productVariant,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getProductVariant = async (req: Request, res: Response) => {
  try {
    const productVariant = await ProductVariant.findOne({
      _id: req.params.id,
      isVisibility: true,
    })
      .populate({
        path: "option_value",
        match: { isVisibility: true }, // Populate option_value only when isVisibility is true
      })
      .exec();

    if (!productVariant) {
      return res.status(404).json({
        success: false,
        message: "Product Variant Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully Fetched Product Variant Details For Given ID",
      data: productVariant,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateProductVariant = async (req: Request, res: Response) => {
  try {
    const productVariant = await ProductVariant.findById(req.params.id);
    if (!productVariant) {
      return res.status(404).json({
        success: false,
        message: "Product Variant Not Found with Given ID",
      });
    }
    const updatedProductVariant = await ProductVariant.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Product variant Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteProductVariant = async (req: Request, res: Response) => {
  try {
    const product = await ProductVariant.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success:false,
        message:"Product Not Found"
      })
    }

    const updatedProductVariant = await ProductVariant.findByIdAndUpdate(
      req.params.id,
      { isVisibility: false },{new:true}
    );

    return res.status(200).json({
      success: true,
      message: "Product variant deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
