import mongoose, { Schema } from 'mongoose'

const employeesSchema = new Schema(
  {
    nome: {
      type: String,
      require: true
    },
    cargo: {
      type: String,
      require: true
    },
    departamento: {
      type: String,
      require: true
    },
    dataAdmissao: {
      type: String,
      require: true
    }
  },
  { timestamps: true }
)

const EmployeesModel = mongoose.model('Employees', employeesSchema)

export { EmployeesModel }
