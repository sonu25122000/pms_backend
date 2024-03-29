/**
 * @swagger
 * /api/edit-product-variant-options:
 *   get:
 *     summary: Get variant options
 *     description: Retrieve all variant options that are visible.
 *     tags:
 *        - Product Variant Options
 *     responses:
 *       200:
 *         description: Successful operation. Returns variant options.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                   description: Indicates if the operation was successful.
 *                 message:
 *                   type: string
 *                   example: Variant Option Data fetched Successfully
 *                   description: A message describing the outcome of the operation.
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 60f1d176ebeb2400155e6e11
 *                         description: The ID of the variant option.
 *                       order:
 *                         type: number
 *                         example: 99
 *                       name:
 *                         type: string
 *                         example: Color
 *                         description: The name of the variant option.
 *                       isVisibility:
 *                         type: boolean
 *                         example: true
 *                         description: Indicates if the variant option is visible.
 *                       createdAt:
 *                         type: string
 *                         example: 2024-03-15T10:26:18.493Z
 *                       updatedAt:
 *                         type: string
 *                         example: 2024-03-15T10:26:18.493Z
 *       404:
 *         description: Variant options not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: Indicates if the operation was successful.
 *                 message:
 *                   type: string
 *                   example: Variant Options Not Found
 *                   description: A message describing the outcome of the operation.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: Indicates if the operation was successful.
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 *                   description: A message describing the outcome of the operation.
 */

/**
 * @swagger
 * /api/edit-product-variant-options/{id}:
 *   post:
 *     summary: Create and Add a variant option to a product variant
 *     description: Create Add a variant option to a product variant by its ID.
 *     tags:
 *        - Product Variant Options
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product variant to add the variant option to.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order:
 *                 type: number
 *                 description: Phone number of the delivery partner
 *               value:
 *                 type: string
 *                 description: Region of service for the delivery partner
 *     responses:
 *       200:
 *         description: Variant option successfully added to the product variant.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                   description: Indicates if the operation was successful.
 *                 message:
 *                   type: string
 *                   example: Variant Option Created Successfully
 *                   description: A message describing the outcome of the operation.
 *       400:
 *         description: Bad request. Product variant ID parameter is missing.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: Indicates if the operation was successful.
 *                 message:
 *                   type: string
 *                   example: Product Variant ID Not Given
 *                   description: A message describing the outcome of the operation.
 *       404:
 *         description: Product variant not found with the given ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: Indicates if the operation was successful.
 *                 message:
 *                   type: string
 *                   example: Product Variant Not Found with given ID
 *                   description: A message describing the outcome of the operation.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
// delete

/**
 * @swagger
 * /api/edit-product-variant-options/{id}:
 *   delete:
 *     summary: Delete a variant option
 *     description: Delete a variant option by its ID. Soft deletes the variant option by setting isVisibility to false.
 *     tags:
 *        - Product Variant Options
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the variant option to delete.
 *     responses:
 *       200:
 *         description: Variant option successfully soft deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                   description: Indicates if the operation was successful.
 *                 message:
 *                   type: string
 *                   example: Successfully Deleted Variant Option
 *                   description: A message describing the outcome of the operation.
 *       404:
 *         description: Variant option not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: Indicates if the operation was successful.
 *                 message:
 *                   type: string
 *                   example: Variant Option Not Found with ID
 *                   description: A message describing the outcome of the operation.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: Indicates if the operation was successful.
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 *                   description: A message describing the outcome of the operation.
 */

// update

/**
 * @swagger
 * /api/edit-product-variant-options/{id}:
 *   put:
 *     summary: Update a variant option
 *     description: Update a variant option by its ID. Soft deletes the variant option by setting isVisibility to false.
 *     tags:
 *        - Product Variant Options
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the variant option to update.
  *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order:
 *                 type: number
 *                 description: Order Number
 *               value:
 *                 type: string
 *                 description: Value of variant option
 *     responses:
 *       200:
 *         description: Variant option successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                   description: Indicates if the operation was successful.
 *                 message:
 *                   type: string
 *                   example: Successfully updated Variant Option
 *                   description: A message describing the outcome of the operation.
 *       404:
 *         description: Variant option not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: Indicates if the operation was successful.
 *                 message:
 *                   type: string
 *                   example: Variant Option Not Found with ID
 *                   description: A message describing the outcome of the operation.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: Indicates if the operation was successful.
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 *                   description: A message describing the outcome of the operation.
 */



/**
 * @swagger
 * /api/edit-product-variant-options/{id}:
 *   get:
 *     summary: Get a variant option by ID
 *     description: Retrieve a variant option by its ID.
 *     tags:
 *        - Product Variant Options
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the variant option to retrieve.
 *     responses:
 *       200:
 *         description: Variant option successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                   description: Indicates if the operation was successful.
 *                 message:
 *                   type: string
 *                   example: Successfully fetched Variant Option Data
 *                   description: A message describing the outcome of the operation.
 *                 data:
 *                   type: object
 *                   description: The retrieved variant option object.
 *       400:
 *         description: Bad request. ID parameter is missing.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: Indicates if the operation was successful.
 *                 message:
 *                   type: string
 *                   example: Please Pass Id as Param
 *                   description: A message describing the outcome of the operation.
 *       404:
 *         description: Variant option not found with the given ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: Indicates if the operation was successful.
 *                 message:
 *                   type: string
 *                   example: Variant Option Not Found With Given ID
 *                   description: A message describing the outcome of the operation.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: Indicates if the operation was successful.
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 *                   description: A message describing the outcome of the operation.
 */
