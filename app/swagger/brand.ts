/**
 * @swagger
 * /api/brands:
 *   post:
 *     summary: add brand with image
 *     description: Uploads a file with the specified parameters.
 *     tags:
 *       - Brand
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: name of the brand
 *                 example: brand name
 *               description:
 *                 type: string
 *                 description: description of the brand
 *                 example: description of the brand
 *               isVisible:
 *                 type: boolean
 *                 description: visibility of product true/false
 *                 example: true
 *               myImage:
 *                 type: string
 *                 format: binary
 *                 description: The file to upload
 *     responses:
 *       '200':
 *         description: File uploaded successfully
 *       '400':
 *         description: Bad request - if the file is missing or the parameters are invalid
 *       '500':
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/brands:
 *   get:
 *     summary: Get a list of brands with pagination
 *     description: Retrieve a list of brands with pagination and optional filtering.
 *     tags:
 *       - Brand
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number to retrieve
 *         required: false
 *         default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of items per page
 *         required: false
 *         default: 10
 *     responses:
 *       '200':
 *         description: A list of brands
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/brands/{id}:
 *   get:
 *     summary: Get a brand by ID
 *     description: Retrieve a brand by its ID.
 *     tags:
 *       - Brand
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the brand to retrieve
 *     responses:
 *       '200':
 *         description: Brand found
 *       '404':
 *         description: Brand not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/brands/{id}:
 *   delete:
 *     summary: Delete a brand by ID
 *     description: Delete a brand by its ID.
 *     tags:
 *       - Brand
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the brand to delete
 *     responses:
 *       '200':
 *         description: Brand deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       '404':
 *         description: Brand not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/brands/{id}:
 *   put:
 *     summary: Update brand with image
 *     description: |
 *       <div style="font-size:30px">
 *         <ul>
 *           <li>Uploads a file with the specified parameters for the specified brand.</li>
 *           <li>This endpoint updates a brand by ID.</li>
 *           <li>If a file is provided, it updates the brand's fields along with the logo URL.</li>
 *           <li>If no file is provided, it updates only the request body fields.</li>
 *         </ul>
 *       </div>
 *     tags:
 *       - Brand
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the brand to update
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the brand
 *                 example: brand name
 *               description:
 *                 type: string
 *                 description: Description of the brand
 *                 example: description of the brand
 *               isVisible:
 *                 type: boolean
 *                 description: Visibility of product (true/false)
 *                 example: true
 *               myImage:
 *                 type: string
 *                 format: binary
 *                 description: The file to upload
 *     responses:
 *       '200':
 *         description: File uploaded successfully
 *       '400':
 *         description: Bad request - if the file is missing or the parameters are invalid
 *       '500':
 *         description: Internal server error
 */
