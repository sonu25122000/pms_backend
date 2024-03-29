/**
 * @swagger
 * /api/partner:
 *   get:
 *     summary: Get list of partners
 *     description: Retrieve a list of partners including vendors and delivery partners.
 *     tags:
 *       - Partners
 *     responses:
 *       '200':
 *         description: A list of partners retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful.
 *                 message:
 *                   type: string
 *                   description: Message describing the result of the operation.
 *                 data:
 *                   type: array
 *                   description: List of partners including vendors and delivery partners.
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The ID of the partner.
 *                       name:
 *                         type: string
 *                         description: The name of the partner.
 *                       email:
 *                         type: string
 *                         description: The email of the partner.
 *                       phone_number:
 *                         type: string
 *                         description: The phone number of the partner.
 *                       city:
 *                         type: string
 *                         description: The city of the partner.
 *                       state:
 *                         type: string
 *                         description: The state of the partner.
 *                       country:
 *                         type: string
 *                         description: The country of the partner.
 *                       is_active:
 *                         type: boolean
 *                         description: Indicates if the partner is active.
 *                       type:
 *                         type: string
 *                         description: The type of the partner (VENDOR or DELIVERY_PARTNER).
 *       '500':
 *         description: Internal server error
 */
