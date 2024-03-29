//add category
/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Add a new category
 *     description: Adds a new category with the specified parameters. If a parent category is provided, it is associated with the parent category.
 *     tags:
 *       - Category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_name:
 *                 type: string
 *                 description: Name of the category
 *                 example: Category Name
 *               category_slug:
 *                 type: string
 *                 description: Slug for the category
 *                 example: category-slug
 *               parent:
 *                 type: string
 *                 description: Parent category ID. If not provided, it defaults to "root"
 *                 example: 61f6511e03a5e4362f9b2f55
 *             required:
 *               - category_name
 *               - category_slug
 *     responses:
 *       '201':
 *         description: Category added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Category added successfully
 *                 categoryId:
 *                   type: string
 *                   example: 61f6511e03a5e4362f9b2f55
 *       '404':
 *         description: Category with the given slug already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Category already exists with the given slug
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

//get all category
/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     description: Retrieves all categories with their details.
 *     tags:
 *       - Category
 *     responses:
 *       '200':
 *         description: Successfully fetched all categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Successfully fetched all details
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Category'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

/**
 * @swagger
 * /api/categories/{categoryId}:
 *   get:
 *     summary: Get a single category
 *     description: Retrieves details of a single category by its ID.
 *     tags:
 *       - Category
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to retrieve
 *     responses:
 *       '200':
 *         description: Category data fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Category data fetched successfully
 *                 data:
 *                   $ref: '#/components/schemas/Category'
 *       '404':
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Category not found
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

//update category

/**
 * @swagger
 * /api/categories/{categoryId}:
 *   put:
 *     summary: Update a category
 *     description: Updates details of a category by its ID.
 *     tags:
 *       - Category
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_name:
 *                 type: string
 *                 description: Name of the category
 *                 example: Updated Category Name
 *               category_slug:
 *                 type: string
 *                 description: Slug for the category
 *                 example: updated-category-slug
 *               parent:
 *                 type: string
 *                 description: ID of the parent category
 *                 example: 61f6511e03a5e4362f9b2f55
 *               status:
 *                 type: boolean
 *                 description: status of the category
 *                 example: true
 *     responses:
 *       '200':
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Category updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     category_name:
 *                       type: string
 *                       example: Updated Category Name
 *                     category_slug:
 *                       type: string
 *                       example: updated-category-slug
 *                     parent:
 *                       type: string
 *                       example: 61f6511e03a5e4362f9b2f55
 *       '404':
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Category not found
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */


//delete category
/**
 * @swagger
 * /api/categories/{categoryId}:
 *   delete:
 *     summary: Delete a category
 *     description: Deletes a category by its ID.
 *     tags:
 *       - Category
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to delete
 *     responses:
 *       '200':
 *         description: Category deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Successfully deleted category
 *       '404':
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Category not found
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

/**
 * @swagger
 * /api/categories/category/{categorySlug}:
 *   get:
 *     summary: Retrieve category based on slug
 *     description: Retrieve category details based on the provided slug.
 *     tags:
 *       - Category
 *     parameters:
 *       - in: path
 *         name: categorySlug
 *         required: true
 *         schema:
 *           type: string
 *         description: The slug of the category to retrieve.
 *     responses:
 *       '200':
 *         description: A successful response with the category data.
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
 *                   description: A message regarding the status of the request.
 *                 data:
 *                   type: object
 *                   description: The retrieved category data.
 *       '400':
 *         description: Bad request if the category slug is missing.
 *       '404':
 *         description: Category not found.
 *       '500':
 *         description: Internal server error.
 */