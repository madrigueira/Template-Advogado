import { db, admin } from '../config/database.js'
import { v4 as uuid } from 'uuid'

const forgotRef = db.collection('forgotPass')

export default class forgotPass {

  constructor(email, code = null) {
    this.email = email
    this.uuid = uuid()
    this.code =  code == null ? Math.floor(Math.random() * 10000) : code
    this.expire = null //admin.firestore.Timestamp.fromDate(now)
  }

  async createForgotPass() {
    
    const doc = await forgotRef.add(JSON.parse(JSON.stringify(this)))
  
    return doc.id
  }

  setExpireDate(date) {
    this.expire = admin.firestore.Timestamp.fromDate(new Date(date))
  }

  async get() {

    const doc = await forgotRef.where('email', '==', this.email).where('code', '==', this.code).orderBy('expire', 'asc').limit(1).get()

    let docs = []

    doc.forEach((item)=>{
      docs.push(item._fieldsProto)
    })
    
    return docs

  }

}