import admin from 'firebase-admin'

import dotenv from 'dotenv'
dotenv.config()

const serviceAccount = JSON.parse(process.env.DB)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()

export { db, admin }