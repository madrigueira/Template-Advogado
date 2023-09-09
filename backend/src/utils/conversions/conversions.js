
const toEmail = (email)=>{
  const newEmail = email.trim().toLowerCase()

  return newEmail
}

const toName = (name)=>{
  const newName = name.trim()

  return newName
}

const toUf = (uf)=>{
  const newUf = uf.trim().toUpperCase()

  return newUf
}

const toText = (text)=>{
  return text.trim()
}

export default {
  toEmail,
  toName,
  toUf,
  toText
}