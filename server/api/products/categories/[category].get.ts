import { Db } from '../../../lib/db'
const db = new Db().getInstance()

export default defineEventHandler((event) => {
  return { products: db.data?.products.filter((product) => product.category === event.context.params.category ) || null }
})