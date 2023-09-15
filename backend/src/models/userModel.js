import { db } from '../config/database.js'

const loginsRef = db.collection('users')
const forgotPass = db.collection('forgotPass')

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

  await docs[0].ref.update(newUser)

  return true
}

const createForgotPass = async (forgot)=>{
  const user = await loginsRef.where('email', '==', forgot.email).get()

  if (!user) return false

  const doc = await forgotPass.add({
    email: forgot.email,
    uuid: forgot.uuid,
    code: forgot.code,
    expire: forgot.expire
  })

  return doc.id
}

export default { 
  createUser, 
  getUserByEmail, 
  updateUserByEmail,
  createForgotPass
}