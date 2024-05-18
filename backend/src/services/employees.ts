import { EmployeesModel } from '../../models/employees'

async function listEmployeesService(
  page: number = 1,
  itemsPerPage: number = 20
) {
  try {
    const [rows, totalItems] = await Promise.all([
      EmployeesModel.find()
        .skip((page - 1) * itemsPerPage)
        .limit(itemsPerPage),
      EmployeesModel.countDocuments()
    ])

    const totalPages = Math.ceil(totalItems / itemsPerPage)
    return { page, totalPages, rows, totalItems }
  } catch (error: any) {
    console.error(error)
    throw new Error('Não foi possível listar funcionários')
  }
}

async function getEmployeeService(id: string) {
  try {
    const response = await EmployeesModel.findById(id)
    return response
  } catch (error: any) {
    if ((error.message as string).match(/Cast to ObjectId failed for value/i)) {
      return { status: 400, errorMessage: 'InvalidId' }
    }
    throw new Error('Não foi possível listar funcionários')
  }
}

async function createEmployeeService(employeeData: {
  nome: string
  cargo: string
  departamento: string
  dataAdmissao: string
}) {
  try {
    const response = await EmployeesModel.create(employeeData)
    return response
  } catch (error) {
    console.error(error)
    throw new Error('Não foi possível criar funcionário')
  }
}

async function updateEmployeeService(
  id: string,
  employeeData: {
    nome?: string
    cargo?: string
    departamento?: string
    dataAdmissao?: string
  }
) {
  try {
    const response = await EmployeesModel.findByIdAndUpdate(id, employeeData)
    return response
  } catch (error: any) {
    if ((error.message as string).match(/Cast to ObjectId failed for value/i)) {
      return { status: 400, errorMessage: 'InvalidId' }
    }
    console.error(error)
    throw new Error('Não foi possível criar funcionário')
  }
}

async function deleteEmployeeService(id: string) {
  try {
    const response = await EmployeesModel.findByIdAndDelete(id)
    return response
  } catch (error: any) {
    if ((error.message as string).match(/Cast to ObjectId failed for value/i)) {
      return { status: 400, errorMessage: 'InvalidId' }
    }
    console.error(error)
    throw new Error('Não foi possível criar funcionário')
  }
}

export {
  createEmployeeService,
  listEmployeesService,
  getEmployeeService,
  updateEmployeeService,
  deleteEmployeeService
}
