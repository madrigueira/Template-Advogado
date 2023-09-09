import { db } from '../config/database.js'

const loginsRef = db.collection('users')

const createUser = async (user)=>{
  const doc = await loginsRef.add(user)

  return doc.id
}

const getUserByEmail = async (email)=>{
  const doc = await loginsRef.where('email', '==', email).get()

  let docs = []

  doc.forEach((item)=>{
    docs.push(item._fieldsProto)
  })

  return docs
}

const updateUserByEmail = async (email, newUser)=>{
  const doc = await loginsRef.where('email', '==', email).get()

  let docs = []

  doc.forEach(item => {
    docs.push(item)
  })

  if (docs.length != 1) return false

  await docs[0].ref.update(user)

  return true
}

export default { 
  createUser, 
  getUserByEmail, 
  updateUserByEmail 
}