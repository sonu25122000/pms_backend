import { Request, Response } from "express";
import {
  DeliveryPartner,
  DeliveryPartnerModel,
  IsActive,
} from "../../models/DeliveryPartner";
import User, { UserRole } from "../../models/User";
import generatePassword from "generate-password";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { sendResetEmail } from "../../services/sendMail";
import { loginCrediantialTemplate } from "../../utils/emailTemplate";
import { handleMongoError } from "../../utils/mongoErrorHandler";

export const registerController = async (req: Request, res: Response) => {
  let session: mongoose.ClientSession | null = null;
  try {
    // Start a MongoDB session
    session = await mongoose.startSession();
    session.startTransaction();

    // Generate a random password
    const generatedPassword = generatePassword.generate({
      length: 8,
      numbers: true,
      symbols: true,
      uppercase: true,
      excludeSimilarCharacters: true,
      strict: true,
      exclude: '"',
    });

    // Hash the generated password before saving it
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User Already Exist with same email",
      });
    }

    // Create a new user
    const newUser = new User({
      username: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role: UserRole.DELIVERY_PARTNER,
    });
    const savedUser = await newUser.save({ session });

    // Create a new delivery partner
    const newDeliveryPartner = new DeliveryPartnerModel({
      user_id: savedUser._id,
      name: req.body.name,
      email: req.body.email,
      phone_number: req.body.phone_number,
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
    });
    await newDeliveryPartner.save({ session });

    await sendResetEmail(
      req.body.email,
      loginCrediantialTemplate(req.body.email, generatedPassword),
      "login credentials for COREMS"
    );
    // Commit the transaction
    await session.commitTransaction();

    // Return success response with generated password
    res.status(201).json({
      success: true,
      message: "Partner Created, Please Check your Email for Crediantial",
    });
  } catch (err) {
    console.error("Error registering delivery partner:", err);
    handleMongoError(err, res);
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

export const getDeliveryPartnerController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    const DeliveryPartner = await DeliveryPartnerModel.find({
      _id: id,
      is_deleted: false,
    });

    if (!DeliveryPartner || DeliveryPartner.length == 0) {
      return res.status(404).json({
        success: false,
        message: `Delivery Partner not exist with ID ${id}`,
      });
    }

    console.log(DeliveryPartner);

    return res.status(200).json({
      success: true,
      message: "Delivery Partner data fetched successfully",
      data: DeliveryPartner,
    });
  } catch (error) {
    console.error("Error in Delivery Partner:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllDeliveryPartnerController = async (
  req: Request,
  res: Response
) => {
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
      if (Object.keys(DeliveryPartnerModel.schema.paths).includes(key)) {
        if (key !== "sortBy") {
          filterQuery[key] = {
            $regex: new RegExp(req.query[key] as string, "i"),
          };
        }
      }
    }

    const deliveryPartners: DeliveryPartner[] = await DeliveryPartnerModel.find(
      { ...filterQuery, is_deleted: false }
    )
      .sort(sortQuery)
      .skip(skip)
      .limit(limit);

    if (deliveryPartners.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No Delivery Partner Data Found",
        data: deliveryPartners,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(deliveryPartners.length / limit),
          totalItems: deliveryPartners.length,
        },
      });
    }
    return res.status(200).json({
      success: true,
      message: "list of Delivery Partner",
      data: deliveryPartners,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(deliveryPartners.length / limit),
        totalItems: deliveryPartners.length,
      },
    });
  } catch (error) {
    console.error("Error fetching Delivery Partner list:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const updateDeliveryPartnerController = async (
  req: Request,
  res: Response
) => {
  let session: mongoose.ClientSession | null = null;
  session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { id } = req.params;
    // Start a MongoDB session

    // Ensure the delivery partner exists
    const existingDeliveryPartner =
      await DeliveryPartnerModel.findByIdAndUpdate(id, req.body).session(
        session
      );
    const user = await User.findById(existingDeliveryPartner?.user_id).session(
      session
    );
    if (!existingDeliveryPartner || !user) {
      return res.status(404).json({
        success: false,
        message: "Delivery partner not found",
      });
    }
    if (req.body.name) {
      user.username = req.body.name;
      await user.save({ session });
    }

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      success: true,
      message: "Delivery partner updated successfully",
    });
  } catch (error) {
    console.error("Error updating delivery partner:", error);
    await session.abortTransaction();
    session.endSession();

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const deleteDeliveryPartnerController = async (
  req: Request,
  res: Response
) => {
  let session: mongoose.ClientSession | null = null;
  session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { id } = req.params;

    // Ensure the delivery partner exists
    const existingDeliveryPartner = await DeliveryPartnerModel.findById(id);
    const user = await User.findById(existingDeliveryPartner?.user_id).session(
      session
    );
    if (!existingDeliveryPartner || !user) {
      return res.status(404).json({
        success: false,
        message: "Delivery partner not found",
      });
    }

    // Perform soft delete by updating the 'is_deleted' field
    existingDeliveryPartner.is_deleted = true;
    user.is_active = false;
    await existingDeliveryPartner.save({ session });
    await user.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      success: true,
      message: "Delivery partner deleted successfully",
    });
  } catch (error) {
    console.error("Error Deleting delivery partner:", error);
    await session.abortTransaction();
    session.endSession();

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const activateDeliveryParter = async (req: Request, res: Response) => {
  try {
    const partnerId = req.params.id;

    const partner: DeliveryPartner | null = await DeliveryPartnerModel.findById(
      partnerId
    );

    if (partner && partner.is_active == IsActive.Activate) {
      return res.status(400).json({
        success: false,
        message: "Delivery Partner already Activate",
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

export const deactivateDeliveryParter = async (req: Request, res: Response) => {
  try {
    const partnerId = req.params.id;

    const partner: DeliveryPartner | null = await DeliveryPartnerModel.findById(
      partnerId
    );

    if (partner && partner.is_active == IsActive.DeActivate) {
      return res.status(400).json({
        success: false,
        message: "Delivery Partner already Deactivated",
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
