import admin from 'firebase-admin'
import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);

console.log(dotenv.config({
  path:  __dirname.replace('backend\\src\\config', '.env')
}))

const serviceAccount = JSON.parse(process.env.DB)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()

export { db, admin }