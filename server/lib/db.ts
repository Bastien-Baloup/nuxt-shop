import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

type Products = {
  "name": string | null,
  "slug": string,
  "category": string,
  "price": number,
  "description": string | null,
  "brand": string | null,
  "sizes": string[],
  "onSale": boolean,
  "bestSeller": boolean,
  "images": string[] | null,
  "available": boolean
}

type User = {
  "name": string,
  "mail": string
}

type Data = {
  products: Products[],
  users: User[]
}

export class Db {

  private static instance: Low<Data>

  constructor() {
    if (!Db.instance) {
      const __dirname = dirname(fileURLToPath(import.meta.url));

      // Use JSON file for storage
      const file = join(__dirname, 'db.json')
      const adapter = new JSONFile<Data>(file)
      Db.instance = new Low(adapter)
    }
  }

  public getInstance = () => Db.instance

}
