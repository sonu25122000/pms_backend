import { Request, Response } from "express";
import VariantOption from "../models/VariantOption";
import ProductVariant from "../models/ProductVariant";

export const addVariant = async (req: Request, res: Response) => {
  try {
    const product_variant_id = req.params.id;
    if (!product_variant_id) {
      return res.status(400).json({
        success: false,
        message: "Product Variant ID Not Given",
      });
    }
    const productVariant = await ProductVariant.findOne({
      _id: product_variant_id,
    });

    if (!productVariant) {
      return res.status(404).json({
        success: false,
        message: "Product Variant Not Found with given ID",
      });
    }

    const newOption = new VariantOption(req.body);
    await newOption.save();
    productVariant.option_value.push(newOption._id);
    productVariant.save();
    return res.status(200).json({
      success: true,
      message: "Variant Option Created Successfully",
    });
  } catch (error) {
    console.log("Error in add Variant controller", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getVariantOptions = async (req: Request, res: Response) => {
  try {
    const variant = await VariantOption.find({ isVisibility: true });
    if (!variant) {
      return res.status(404).json({
        success: false,
        message: "Variant Options Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Variant Option Data fetched Successfully",
      data: variant,
    });
  } catch (error) {
    console.log("Error in Fetching Variant Option data controller", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        success: false,
        message: "Please Pass Id as Param",
      });
    }

    const variantOption = await VariantOption.findOne({
      _id: req.params.id,
      isVisibility: true,
    });

    if (!variantOption) {
      return res.status(404).json({
        success: false,
        message: "Variant Option Not Found With Given ID",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully fetched Variant Option Data",
      data: variantOption,
    });
  } catch (error) {
    console.log("Error in  Variant Option controller", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateVariantOption = async (req: Request, res: Response) => {
  console.log("xnbmds",req.body)
  try {
    const {id} = req.params
    const existingOption = await VariantOption.findById(id);
    if (!existingOption) {
        return res.status(404).json({
            success:false,
            message:"Variant Option Not Found with ID"
        })
    }

    const existingDeliveryPartner = await VariantOption.findByIdAndUpdate(id,req.body);
 
    return res.status(200).json({
      success: true,
      message: "Successfully Updated Variant Option",
    });
  } catch (error) {
    console.log("Error in  Variant Option controller", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteVariantOption = async (req: Request, res: Response) => {
  try {

    const existingOption = await VariantOption.findById(req.params.id);
    if (!existingOption) {
        return res.status(404).json({
            success:false,
            message:"Variant Option Not Found with ID"
        })
    }

    const variantOption = await VariantOption.findByIdAndUpdate(req.params.id, {
      isVisibility: false,
    });
    return res.status(200).json({
      success: true,
      message: "Successfully Deleted Variant Option",
    });
  } catch (error) {
    console.log("Error in  Variant Option controller", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
