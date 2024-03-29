import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User, { UserRole } from "../models/User";
import Vendor, { VendorDocument } from "../models/Vendor";
import { DeliveryPartnerModel, DeliveryPartner } from "../models/DeliveryPartner";

// function generateRandomPassword() {
//   const length = 8;
//   const charset =
//     "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//   let password = "";
//   for (let i = 0; i < length; i++) {
//     const randomIndex = Math.floor(Math.random() * charset.length);
//     password += charset[randomIndex];
//   }
//   return password;
// }

// function generateRandomNumber() {
//   let length = 3;
//   const charset = "0123456789";
//   let password = "";
//   for (let i = 0; i < length; i++) {
//     const randomIndex = Math.floor(Math.random() * charset.length);
//     password += charset[randomIndex];
//   }
//   return password;
// }

export const getPartners = async (req: Request, res: Response) => {
  try {
    const vendorList: VendorDocument[] = await Vendor.find({
      isDeleted: false,
    });

    const deliveryPartners: DeliveryPartner[] = await DeliveryPartnerModel.find(
      {  is_deleted: false }
    );

    let partners: any[] = [];

    vendorList.map((vendor) => {
      let vendorObj = {
        id: vendor._id,
        name: vendor.name,
        email: vendor.email,
        phone_number: vendor.phone_number,
        city: vendor.city,
        state: vendor.state,
        country: vendor.country,
        is_active: vendor.is_active, 
        type: UserRole.VENDOR
      };
      partners.push(vendorObj);
    });

    deliveryPartners.map((partner) => {
      let partnerObj = {
        id: partner._id,
        name: partner.name,
        email: partner.email,
        phone_number: partner.phone_number,
        city: partner.city,
        state: partner.state,
        country: partner.country,
        is_active: partner.is_active,
        type: UserRole.DELIVERY_PARTNER
      };
      partners.push(partnerObj);
    });

    // Retrieve vendors with pagination and filter

    return res.status(200).json({
      success: true,
      message: "list of partners",
      data: partners,
    });
  } catch (error) {
    console.error("Error fetching vendor list:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// export const createPartner = async (req: Request, res: Response) => {
//   // get Partner Variables

//   const { userType, email } = req.body;

//   try {
//     let username = email.split("@")[0] + generateRandomNumber();
//     let password = generateRandomPassword();
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new User
//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword,
//     });

//     await newUser.save();

//     if (userType === "vendor") {
//       const newVendor = new Vendor({
//         userID: newUser._id,
//         email: email,
//         name: username,
//         ...req.body,
//       });

//       await newVendor.save();
//       // once the vendor created update the role in user schema as well
//       await User.findByIdAndUpdate(newUser._id, { role: UserRole.VENDOR });

//       return res.status(201).json({
//         success: true,
//         message: "Vendor registered successfully",
//         data: newVendor,
//       });
//     } else {
//       const newDeliveryPartner = new DeliveryPartnerModel({
//         userID: newUser._id,
//         email: email,
//         name: username,
//         ...req.body,
//       });
//       await newDeliveryPartner.save();

//       //updating role in user model
//       await User.findByIdAndUpdate(newUser._id, {
//         role: UserRole.DELIVERY_PARTNER,
//       });

//       return res.status(201).json({
//         success: true,
//         message: "Delivery Partner registered successfully",
//         newDeliveryPartnerId: newDeliveryPartner._id,
//       });
//     }
//   } catch (error) {
//     console.error("Error in Partner registration:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };
