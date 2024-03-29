import express from "express";

import superAdminRoutes from "./superAdmin";
import vendorRoute from "./vendor";
import userRoute from "./user";
import categoryRoute from './category'
import deliveryRoute from "./deliveryPartner";
import productVariantOptionRoute from "./variantOption";
import productVariantRoute from "./productVariant";
import brandRoute from "./brand";
import partnerRoute from "./partner";

const app = express();

app.use("/superAdmin", superAdminRoutes);
app.use("/user", userRoute);
app.use("/delivery", deliveryRoute);
app.use("/vendor", vendorRoute);
app.use("/delivery-partner", deliveryRoute);
app.use("/brands",brandRoute)
app.use("/categories",categoryRoute)
app.use("/edit-product-variant-options", productVariantOptionRoute);
app.use("/product-variants", productVariantRoute);
app.use("/brands", brandRoute);
app.use("/partner", partnerRoute);

export default app;
