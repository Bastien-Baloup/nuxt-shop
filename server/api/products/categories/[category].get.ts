import { DbConnection } from '../../../lib/db'
const db = DbConnection.getInstance().getConnection()

/**
 * route : /api/products/categories/[category]
 * method : GET
 * Return all the products with the category = to the route parameter
 */
export default defineEventHandler((event) => {
  return { products: db.data?.products.filter((product) => product.category === event.context.params.category ) || null }
})