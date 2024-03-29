import { Request, Response } from "express";
import Brand from "../models/Brand";
import { validateBrandInput } from "../utils/brandValidation";
import { executeNextcloudTask, generateImageUrl } from "../nextCloud.config";
const multer = require("multer");
const path = require("path");

// Set storage engine for multer
const storage = multer.diskStorage({
  destination: "app/brandLogo/",
  filename: function (req: Request, file: any, cb: any) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Initialize multer upload with file size limit and file filter
const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 10 MB file size limit
  fileFilter: function (req: Request, file: any, cb: any) {
    checkFileType(file, cb);
  },
}).single("myImage"); // 'myImage' is the name attribute in the form input

// Check file type
function checkFileType(file: any, cb: any) {
  // Allowed file extensions
  const filetypes = /jpeg|jpg|png|gif|webp/;
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check MIME type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images only!");
  }
}

const addBrand = async (req: any, res: any) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }
    const filePath = req.file.path;
    await executeNextcloudTask(filePath, `/brandLogo/${req.file.originalname}`);

    const shareData = await generateImageUrl(
      filePath,
      `/brandLogo/${req.file.originalname}`
    );

    if (!shareData.ocs || !shareData.ocs.data || !shareData.ocs.data.url) {
      throw new Error("Failed to generate logo url");
    }

    validateBrandInput(req, res, async () => {
      // If validation passes, proceed to create the new brand
      const newBrand = new Brand({
        ...req.body,
        logo_url: `${shareData.ocs.data.url}/preview`,
      });
      await newBrand.save();

      return res.status(200).json({
        success: true,
        message: "Brand added successfully!",
        data: newBrand,
      });
    });
  } catch (error) {
    console.error("Error executing Nextcloud task:", error);
    res
      .status(500)
      .json({ success: false, message: "Error executing Nextcloud task" });
  }
};

const getAllBrand = async (req: Request, res: Response) => {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Retrieve brand with pagination and filter
    const brandList = await Brand.find({ isVisible: true })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      success: true,
      message: "list of brand",
      data: brandList,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(brandList.length / limit),
        totalItems: brandList.length,
      },
    });
  } catch (error) {
    console.error("Error fetching brand list:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const getBrandById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const brand = await Brand.find({ _id: id, isVisible: true });
    if (!brand) {
      return res.status(404).json({
        success: false,
        message: `brand doesn't exist with ID ${id}`,
      });
    }
    if (brand.length > 0) {
      return res.status(200).json({
        success: true,
        message: "brand data fetched successfully",
        data: brand[0],
      });
    }
    return res.status(200).json({
      success: true,
      message: "brand not exist",
      data: brand,
    });
  } catch (error) {
    console.error("Error fetching brand:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const deleteBrandById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Perform soft delete by updating the 'isVisible' field directly in the database
    const result = await Brand.updateOne(
      { _id: id },
      { $set: { isVisible: false } }
    );
    if (result.modifiedCount <= 0) {
      return res.status(404).json({
        success: false,
        message: "Brand not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Brand deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting brand:", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const updateBrandById = async (req: any, res: Response) => {
  const { id } = req.params;
  try {
    if (!req.file) {
      const updatedBrand = await Brand.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!updatedBrand) {
        return res.status(404).json({
          success: false,
          message: "Brand not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Brand updated successfully",
        data: updatedBrand,
      });
    } else {
      const filePath = req.file.path;
      await executeNextcloudTask(
        filePath,
        `/brandLogo/${req.file.originalname}`
      );

      const shareData = await generateImageUrl(
        filePath,
        `/brandLogo/${req.file.originalname}`
      );

      if (!shareData.ocs || !shareData.ocs.data || !shareData.ocs.data.url) {
        throw new Error("Failed to generate logo url");
      }

      const updatedBrand = await Brand.findByIdAndUpdate(
        id,
        {
          ...req.body,
          logo_url: `${shareData.ocs.data.url}/preview`,
        },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: "Brand added successfully!",
        data: updatedBrand,
      });
    }
  } catch (error) {
    console.error("Error executing Nextcloud task:", error);
    res
      .status(500)
      .json({ success: false, message: "Error executing Nextcloud task" });
  }
};

export const brandController = {
  getAllBrand,
  getBrandById,
  deleteBrandById,
  updateBrandById,
  addBrand,
};
