/**
 * @swagger
 * /api/superAdmin/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - superAdmin Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the superAdmin
 *               firstName:
 *                 type: string
 *                 description: firstName of the superAdmin
 *               lastName:
 *                 type: string
 *                 description: lastName of the superAdmin
 *               username:
 *                 type: string
 *                 description: Username of the superUser
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Password of the superAdmin
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request, user already exists or missing/invalid parameters
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/superAdmin/login:
 *   post:
 *     summary: Authenticate superAdmin and generate JWT token
 *     tags:
 *       - superAdmin Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the superAdmin
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Password of the superAdmin
 *     responses:
 *       200:
 *         description: Login successful, JWT token generated
 *       401:
 *         description: Invalid password or superAdmin not found
 *       500:
 *         description: Internal server error
 */



/**
 * @swagger
 * /api/superAdmin/change-password:
 *   post:
 *     summary: Change superAdmin password
 *     description: Used to change the password of a superAdmin.
 *     tags:
 *       - superAdmin Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 description: The current password of the user.
 *               newPassword:
 *                 type: string
 *                 description: The new password for the user.
 *             required:
 *               - currentPassword
 *               - newPassword
 *     responses:
 *       '200':
 *         description: Password changed successfully
 *       '400':
 *         description: Invalid current password or missing fields
 *       '404':
 *         description: superAdmin not found
 *       '500':
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/superAdmin/forgot-password:
 *   post:
 *     summary: Initiate password reset
 *     description: Initiates the process to reset the password for a user by sending a reset link via email.
 *     tags:
 *       - superAdmin Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *             required:
 *               - email
 *     responses:
 *       '200':
 *         description: Password reset initiated successfully. Check your email for instructions.
 *       '404':
 *         description: User not found with the provided email address.
 *       '500':
 *         description: Internal server error occurred while initiating the password reset process.
 */

/**
 * @swagger
 * /api/superAdmin/confirm-password:
 *   put:
 *     summary: Confirm password reset
 *     description: Confirms the password reset for a user using the provided reset token and updates the password.
 *     tags:
 *       - superAdmin Authentication
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: The reset token received via email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: The new password for the user.
 *             required:
 *               - newPassword
 *     responses:
 *       '200':
 *         description: Password reset successful.
 *       '400':
 *         description: Invalid reset token or missing fields.
 *       '500':
 *         description: Internal server error occurred while resetting the password.
 */


