import { Db } from '../../lib/db'
const db = new Db().getInstance()

export default defineEventHandler((event) => {
  // TODO: add auth check
  return { product: db.data?.products.find((product) => product.slug === event.context.params.slug ) || null }
})