import { Request, Response } from "express";
import User, { UserRole } from "../../models/User";
import Vendor, { IsActive, VendorDocument } from "../../models/Vendor";
import mongoose from "mongoose";
import generatePassword from "generate-password";
import bcrypt from "bcryptjs";
import { loginCrediantialTemplate } from "../../utils/emailTemplate";
import { sendResetEmail } from "../../services/sendMail";

export const vendorRegister = async (req: Request, res: Response) => {
  let session: mongoose.ClientSession | null = null;
  const { email } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exist.",
      });
    }
    // Start a MongoDB session
    session = await mongoose.startSession();
    session.startTransaction();

    // Generate a random 8 password
    const generatedPassword = generatePassword.generate({
      length: 8,
      numbers: true,
      symbols: true,
      uppercase: true,
      excludeSimilarCharacters: true,
      strict: true,
    });

    // Hash the generated password before saving it
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    // Create a new user
    const newUser = new User({
      username: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role: UserRole.VENDOR,
    });
    const savedUser = await newUser.save({ session });

    // Create a new delivery partner
    const newVendor = new Vendor({
      user_id: savedUser._id,
      name: req.body.name,
      email: req.body.email,
      phone_number: req.body.phone_number,
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
    });
    await newVendor.save({ session });

    // Commit the transaction
    await session.commitTransaction();

    sendResetEmail(
      req.body.email,
      loginCrediantialTemplate(req.body.email, generatedPassword),
      "login credentials for COREMS"
    );
    // Return success response with generated password
    res.status(201).json({
      success: true,
      message: "Partner Created, Please Check your Email for Crediantial",
    });
  } catch (err) {
    console.error("Error registering vedor partner:", err);
    // Rollback the transaction if an error occurs
    if (session) {
      await session.abortTransaction();
    }
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (session) {
      session.endSession();
    }
  }
};

const getAllVendorList = async (req: Request, res: Response) => {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    enum SortOrder {
      asc = 1,
      desc = -1,
    }

    let sortQuery: { [key: string]: SortOrder } = {}; // Explicitly define SortOrder type

    // Sorting logic
    if (req.query.sortBy) {
      const sortFields: string[] = (req.query.sortBy as string).split(","); // Split sorting fields
      sortFields.forEach((field) => {
        let sortOrder: SortOrder = SortOrder.asc; // Default ascending order
        if (field.startsWith("-")) {
          sortOrder = SortOrder.desc;
          field = field.substring(1); // Remove '-' from field name
        }
        sortQuery[field] = sortOrder;
      });
    }

    // Regex filtering
    let filterQuery: { [key: string]: any } = {}; // Define filterQuery type
    for (const key in req.query) {
      if (Object.keys(Vendor.schema.paths).includes(key)) {
        if (key !== "sortBy") {
          filterQuery[key] = {
            $regex: new RegExp(req.query[key] as string, "i"),
          };
        }
      }
    }

    const vendorList: VendorDocument[] = await Vendor.find({
      ...filterQuery,
      isDeleted: false,
    })
      .sort(sortQuery)
      .skip(skip)
      .limit(limit);

    // Retrieve vendors with pagination and filter

    return res.status(200).json({
      success: true,
      message: "list of vendor",
      data: vendorList,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(vendorList.length / limit),
        totalItems: vendorList.length,
      },
    });
  } catch (error) {
    console.error("Error fetching vendor list:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const getVendorById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const vendor = await Vendor.find({ _id: id, isDeleted: false });
    console.log(vendor);
    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: `Vendor doesn't exist with ID ${id}`,
      });
    }
    if (vendor.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Vendor data fetched successfully",
        data: vendor[0],
      });
    }
    return res.status(200).json({
      success: true,
      message: "Vendor not exist",
      data: vendor,
    });
  } catch (error) {
    console.error("Error fetching vendor list:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const deleteVendorById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Ensure the Vendor exists
    const vendor = await Vendor.findById(id).session(session);
    const user = await User.findById(vendor?.user_id).session(session);
    if (!vendor || !user) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    // Perform soft delete by updating the 'isDeleted' field
    vendor.isDeleted = true;
    await vendor.save();

    user.is_active = false;
    await user.save();

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      success: true,
      message: "Vendor deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting for vendor :", error);

    await session.abortTransaction();
    session.endSession();

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const updateVendorById = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;

    const vendor = await Vendor.findByIdAndUpdate(id, req.body, {
      new: true,
    }).session(session);
    const user = await User.findById(vendor?.user_id).session(session);

    if (!vendor || !user) {
      await session.abortTransaction();
      session.endSession();

      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    if (req.body.name) {
      user.username = req.body.name;
      await user.save();
    }

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      success: true,
      message: "Vendor updated successfully",
      data: vendor,
    });
  } catch (error) {
    console.error("Error in updating vendor:", error);

    await session.abortTransaction();
    session.endSession();

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const activateVendorPartner = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const partner: VendorDocument | null = await Vendor.findById(id);

    if (partner && partner.is_active == IsActive.Activate) {
      return res.status(400).json({
        success: false,
        message: "Vendor Partner already Activate",
      });
    }

    if (!partner) {
      return res
        .status(404)
        .json({ success: false, message: "Partner not found" });
    }

    partner.is_active = IsActive.Activate; // Assuming 'Activated' is one of the values in the IsActive enum
    await partner.save();

    return res.json({
      success: true,
      message: "Partner activated successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).status(500).json("Server Error");
  }
};

const deactivateVendorPartner = async (req: Request, res: Response) => {
  try {
    const partnerId = req.params.id;

    const partner: VendorDocument | null = await Vendor.findById(partnerId);

    if (partner && partner.is_active == IsActive.DeActivate) {
      return res.status(400).json({
        success: false,
        message: "Vendor Partner already Deactivated",
      });
    }

    if (!partner) {
      return res
        .status(404)
        .json({ success: false, message: "Partner not found" });
    }

    partner.is_active = IsActive.DeActivate; // Assuming 'Deactivated' is one of the values in the IsActive enum
    await partner.save();

    return res.json({
      success: true,
      message: "Partner deactivated successfully",
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const vendorController = {
  vendorRegister,
  getAllVendorList,
  getVendorById,
  updateVendorById,
  deleteVendorById,
  activateVendorPartner,
  deactivateVendorPartner,
};
