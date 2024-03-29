/**
 * @swagger
 * /api/product-variants:
 *   get:
 *     summary: Get all Product Variant
 *     description:  |
 *          This endpoint help us to fetch all product variant available with us.
 *          - Need a access token to use this end point.
 *     tags:
 *       - Product Variants
 *     responses:
 *       200:
 *         description: Delivery partners fetched successfully
 *       500:
 *         description: Internal server error
 *       404:
 *         description: Not Found
 */


/**
 * @swagger
 * /api/product-variants/{id}:
 *   get:
 *     summary: Get a product variant by ID
 *     tags:
 *       - Product Variants
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product variant to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved product variant details
 *       404:
 *         description: Product variant not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/product-variants:
 *   post:
 *     summary: Create a new product variant
 *     tags:
 *       - Product Variants
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_variant:
 *                 type: string
 *                 description: The name of the product variant
 *                 example: Color
 *               display_in_filter:
 *                 type: string
 *                 enum:
 *                   - YES
 *                   - NO
 *                 description: Indicates whether to display in filter
 *               variant_type:
 *                 type: string
 *                 description: The type of the variant
 *               order:
 *                 type: integer
 *                 description: The order of the variant
 *     responses:
 *       201:
 *         description: Successfully created a new product variant
 *       400:
 *         description: Bad request, check request body for errors
 *       500:
 *         description: Internal server error, something went wrong
 */




/**
 * @swagger
 * /api/product-variants/{id}:
 *   put:
 *     summary: Update a product variant by ID
 *     tags:
 *       - Product Variants
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product variant to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_variant:
 *                 type: string
 *                 description: The name of the product variant
 *               display_in_filter:
 *                 type: string
 *                 enum:
 *                   - YES
 *                   - NO
 *                 description: Indicates whether to display in filter
 *               variant_type:
 *                 type: string
 *                 description: The type of the variant
 *               isVisibility:
 *                 type: boolean
 *                 description: Indicates visibility of the variant
 *               order:
 *                 type: integer
 *                 description: The order of the variant
 *     responses:
 *       200:
 *         description: Product variant updated successfully
 *       404:
 *         description: Product variant not found
 *       500:
 *         description: Internal server error
 */








/**
 * @swagger
 * /api/product-variants/{id}:
 *   delete:
 *     summary: Delete a product variant
 *     tags:
 *       - Product Variants
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product variant to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product variant deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                   description: Indicates if the operation was successful
 *                 message:
 *                   type: string
 *                   example: Product variant deleted successfully
 *                   description: A message indicating the outcome of the operation
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: Indicates if the operation was successful
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 *                   description: A message indicating the error
 */
