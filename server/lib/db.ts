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
  "mail": string,
  "hash": string,
  "lists": string[][],
  "uuid": string
}

type Data = {
  products: Products[],
  users: User[]
}

// here we use the singleton design pattern:
// the getInstance method creates an instance of the DbConnection class if it doesn't alredy exist and stores it
// then this same DbConnection instance is accessible throughout the app using the getInstance method
export class DbConnection {

  private static instance: DbConnection

  private connection: Low<Data>

  private constructor() {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    // Use JSON file for storage
    const file = join(__dirname, 'db.json')
    const adapter = new JSONFile<Data>(file)
    this.connection = new Low(adapter)
    DbConnection.instance = this
  }

  public static getInstance = () => {
    if (!DbConnection.instance) {
      new DbConnection()
    }
    return DbConnection.instance
  }

  public connect = async () => await this.connection.read()

  public getConnection = () => this.connection

}
