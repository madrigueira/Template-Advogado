import { db, admin } from '../config/database.js'

const loginsRef = db.collection('users')

export default class User {

  constructor(email, password = null, fullName = null) {
    this.email = email
    this.name = fullName
    this.password = password
    this.date_include = null
    this.date_update = null
  }

  async createUser() {

    this.date_include = admin.firestore.Timestamp.fromDate(new Date())
    this.date_update = admin.firestore.Timestamp.fromDate(new Date())

    const doc = await loginsRef.add(JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(this)))))
  
    return doc.id
  }

  async getUserByEmail() {
    const doc = await loginsRef.where('email', '==', this.email).get()
  
    let docs = []
  
    doc.forEach((item)=>{
      docs.push(item._fieldsProto)
    })
  
    return docs
  }

  async updateUserByEmail() {
    const doc = await loginsRef.where('email', '==', this.email).get()

    let docs = []
  
    doc.forEach(item => {
      docs.push(item)
    })
  
    if (docs.length != 1) return false

    const oldUser = await this.getUserByEmail()

    this.password = oldUser[0].password.stringValue
    this.date_include = oldUser[0].date_include.stringValue
    this.date_update = admin.firestore.Timestamp.fromDate(new Date())

    await docs[0].ref.update(JSON.parse(JSON.stringify(this)))
  
    return true
  }

  async updatePassword() {
    
    const doc = await loginsRef.where('email', '==', this.email).get()

    let docs = []

    doc.forEach((item)=>{
      docs.push(item)
    })

    if (docs.length != 1) return false

    const oldUser = await this.getUserByEmail()

    this.name = oldUser[0].name.stringValue
    this.date_include = oldUser[0].date_include.stringValue
    this.date_update = admin.firestore.Timestamp.fromDate(new Date())

    await docs[0].ref.update(JSON.parse(JSON.stringify(this)))

    return true
  }
}