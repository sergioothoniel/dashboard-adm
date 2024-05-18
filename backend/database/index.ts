import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export async function conectDB() {
  try {
    if (!process.env.DB_URL) throw new Error('URL do banco de dados não encontrado')
    await mongoose.connect(process.env.DB_URL)
    console.log('Conectado ao banco de dados')
  } catch (error) {
    console.error(error)
    throw new Error('Não foi possível conectar ao banco de dados')
  }
}