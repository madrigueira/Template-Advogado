import { db, admin } from '../config/database.js'
import { v4 as uuid } from 'uuid'

const forgotRef = db.collection('forgotPass')

export default class forgotPass {

  constructor(email) {
    this.email = email
    this.uuid = uuid()
    this.code = Math.floor(Math.random() * 10000),
    this.expire = null //admin.firestore.Timestamp.fromDate(now)
  }

  async createForgotPass() {
  
    const doc = await forgotRef.add(JSON.parse(JSON.stringify(this)))
  
    return doc.id
  }

  setExpireDate(date) {
    this.expire = date
  }

}