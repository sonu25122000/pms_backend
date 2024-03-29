/**
 * @swagger
 * /api/vendor:
 *   get:
 *     summary: Get vendor partners with pagination, sorting, and dynamic filtering
 *     description: |
 *       This endpoint retrieves a list of vendor partners with support for pagination, sorting, and dynamic filtering.
 *       Below are the query parameters that can be used for pagination, sorting, and filtering:
 *       - page: Page number for pagination.
 *       - limit: Maximum number of items per page.
 *       - sortBy: Field to sort by, prefix with '-' for descending order.
 *       - name: Filter by name.
 *       - email: Filter by email.
 *       - phoneNumber: Filter by phone number.
 *     tags:
 *       - Vendor
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of items per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Field to sort by, prefix with '-' for descending order
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by name
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Filter by email
 *       - in: query
 *         name: phone_number
 *         schema:
 *           type: integer
 *         description: Filter by phone number
 *     responses:
 *       200:
 *         description: Vendor partners fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       500:
 *         description: Internal server error
 */

// get vendor by id

/**
 * @swagger
 * /api/vendor/{id}:
 *   get:
 *     summary: Get a vendor by ID
 *     tags:
 *       - Vendor
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: ID of the vendor to get
 *     responses:
 *       200:
 *         description: Vendor information retrieved successfully
 *       404:
 *         description: Vendor not found
 *       500:
 *         description: Internal server error
 */

// add vendor

/**
 * @swagger
 * /api/vendor:
 *   post:
 *     summary: Add a new vendor
 *     description: |
 *       This endpoint allows you to add a new vendor to the system.
 *       Below is the list of required parameters:
 *       - name: Name of the vendor (required)
 *       - email: Email of the vendor (required, must be unique)
 *       - phone_number: Phone number of the vendor (required)
 *       - country: Country of the vendor (required)
 *       - state: State of the vendor (required)
 *       - city: City of the vendor (required)
 *       - isDeleted: Indicates if the vendor is deleted (default: false)
 *       - is_active: Indicates the activation status of the vendor (default: Pending)
 *     tags:
 *       - Vendor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the vendor
 *                 example: "Vendor Name"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email of the vendor
 *                 example: "vendor@example.com"
 *               phone_number:
 *                 type: string
 *                 description: Phone number of the vendor
 *                 example: "1234567890"
 *               country:
 *                 type: string
 *                 description: Country of the vendor
 *                 example: "United States"
 *               state:
 *                 type: string
 *                 description: State of the vendor
 *                 example: "California"
 *               city:
 *                 type: string
 *                 description: City of the vendor
 *                 example: "Los Angeles"
 *     responses:
 *       201:
 *         description: Vendor added successfully
 *       400:
 *         description: Bad request, missing or invalid parameters
 *       500:
 *         description: Internal server error
 */

// update vendor by id

/**
 * @swagger
 * /api/vendor/{id}:
 *   put:
 *     summary: Update a Vendor by ID
 *     tags:
 *       - Vendor
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Vendor to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the vendor (optional)
 *               phone_number:
 *                 type: string
 *                 description: Phone number of the vendor (optional)
 *               country:
 *                 type: string
 *                 description: Country of the vendor (optional)
 *               state:
 *                 type: string
 *                 description: State of the vendor (optional)
 *               city:
 *                 type: string
 *                 description: City of the vendor (optional)
 *     responses:
 *       '200':
 *         description: vendor  updated successfully
 *       '404':
 *         description: vendor  not found
 *       '500':
 *         description: Internal server error
 */

// delete vendor by id

/**
 * @swagger
 * /api/vendor/{id}:
 *   delete:
 *     summary: Delete a vendor by ID
 *     tags:
 *       - Vendor
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Vendor to delete
 *     responses:
 *       204:
 *         description: Vendor deleted successfully
 *       404:
 *         description: Vendor not found
 *       500:
 *         description: Internal server error
 */

//activate

/**
 * @swagger
 * /api/vendor/activate/{id}:
 *   put:
 *     summary: Activate a Vendor partner
 *     tags:
 *       - Vendor
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the delivery partner to activate
 *     responses:
 *       200:
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates whether the activation was successful
 *                 message:
 *                   type: string
 *                   description: Message indicating the result of the operation
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates whether the activation was successful
 *                 message:
 *                   type: string
 *                   description: Error message indicating why the request is bad
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates whether the activation was successful
 *                 message:
 *                   type: string
 *                   description: Error message indicating the partner was not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates whether the activation was successful
 *                 message:
 *                   type: string
 *                   description: Error message indicating a server error occurred
 */

//deactivate
/**
 * @swagger
 * /api/vendor/deactivate/{id}:
 *   put:
 *     summary: Deactivate a delivery partner
 *     tags:
 *       - Vendor
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the delivery partner to deactivate
 *     responses:
 *       200:
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates whether the deactivation was successful
 *                 message:
 *                   type: string
 *                   description: Message indicating the result of the operation
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates whether the deactivation was successful
 *                 message:
 *                   type: string
 *                   description: Error message indicating why the request is bad
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates whether the deactivation was successful
 *                 message:
 *                   type: string
 *                   description: Error message indicating the partner was not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates whether the deactivation was successful
 *                 message:
 *                   type: string
 *                   description: Error message indicating a server error occurred
 */
