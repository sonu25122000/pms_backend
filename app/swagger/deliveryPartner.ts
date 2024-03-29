/**
 * @swagger
 * /api/delivery-partner/register:
 *   post:
 *     summary: Register a new delivery partner
 *     description: Register a new delivery partner with the provided information. This endpoint creates a new user and associates it with a delivery partner record.
 *     tags:
 *       - Delivery Partner
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the delivery partner
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the delivery partner
 *               phone_number:
 *                 type: string
 *                 description: The phone number of the delivery partner
 *               country:
 *                 type: string
 *                 description: The country of the delivery partner
 *               state:
 *                 type: string
 *                 description: The state of the delivery partner
 *               city:
 *                 type: string
 *                 description: The city of the delivery partner
 *             required:
 *               - name
 *               - email
 *               - phone_number
 *               - country
 *               - state
 *               - city
 *     responses:
 *       201:
 *         description: Partner created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                 message:
 *                   type: string
 *                   description: Message indicating the success of the request
 *       409:
 *         description: User with the same email already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                 message:
 *                   type: string
 *                   description: Error message indicating that the user already exists
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating the internal server error
 */

/**
 * @swagger
 * /api/delivery-partner:
 *   get:
 *     summary: Get delivery partners with pagination, sorting, and dynamic filtering
 *     tags:
 *       - Delivery Partner
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
 *           type: string
 *         description: Filter by phone number
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *         description: Filter by country
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *         description: Filter by state
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Filter by city
 *     responses:
 *       200:
 *         description: Delivery partners fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/delivery-partner/{id}:
 *   get:
 *     summary: Get a delivery partner by ID
 *     tags:
 *       - Delivery Partner
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the delivery partner to retrieve
 *     responses:
 *       200:
 *         description: Delivery partner fetched successfully
 *       404:
 *         description: Delivery partner not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/delivery-partner/{id}:
 *   put:
 *     summary: Update a delivery partner by ID
 *     tags:
 *       - Delivery Partner
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the delivery partner to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the delivery partner (optional)
 *               phone_number:
 *                 type: string
 *                 description: Phone number of the delivery partner
 *               country:
 *                 type: string
 *                 description: Country of the delivery partner (optional)
 *               state:
 *                 type: string
 *                 description: State of the delivery partner (optional)
 *               city:
 *                 type: string
 *                 description: City of the delivery partner (optional)
 *     responses:
 *       '200':
 *         description: Delivery partner updated successfully
 *       '404':
 *         description: Delivery partner not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/delivery-partner/{id}:
 *   delete:
 *     summary: Delete a delivery partner by ID
 *     tags:
 *       - Delivery Partner
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the delivery partner to delete
 *     responses:
 *       200:
 *         description: Delivery partner deleted successfully
 *       404:
 *         description: Delivery partner not found
 *       500:
 *         description: Internal server error
 */

//activate

/**
 * @swagger
 * /api/delivery-partner/activate/{id}:
 *   put:
 *     summary: Activate a delivery partner
 *     tags:
 *       - Delivery Partner
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
 * /api/delivery-partner/deactivate/{id}:
 *   put:
 *     summary: Deactivate a delivery partner
 *     tags:
 *       - Delivery Partner
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
