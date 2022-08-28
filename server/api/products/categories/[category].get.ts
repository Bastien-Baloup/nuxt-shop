import { DbConnection } from '~~/server/lib/db'
const db = DbConnection.getInstance().getConnection()

/**
 * route : /api/products/categories/[category]
 * method : GET
 * Return all the products with the category = to the route parameter
 */
export default defineEventHandler((event) => {
  return { success: true, products: db.data?.products.filter((product) => product.category === event.context.params.category ) || null }
})