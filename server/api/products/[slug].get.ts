import { DbConnection } from '../../lib/db'
const db = DbConnection.getInstance().getConnection()

/**
 * route : /api/products/[slug]
 * method : GET
 * Return the product with the slug = to the route parameter
 */
export default defineEventHandler((event) => {
  return { product: db.data?.products.find((product) => product.slug === event.context.params.slug ) || null }
})