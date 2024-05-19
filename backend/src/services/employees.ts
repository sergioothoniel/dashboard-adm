import { EmployeesModel } from '../../models/employees'

/**
 * Lista os funcionários registrados no banco de dados
 * @param page Página a ser retornada pela API
 * @param itemsPerPage Númeor de itens que deve ter em cada página
 * @returns Lista dos funcionário, página atual, número de página e
 * total de funcionários
 */
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

/**
 * Busca um determinado funcionário de acordo com seu ID
 * @param id ID de identificação do funcionário
 * @returns Dados do funcionario, null caso não exista para o ID ou
 * um objeto com status 400 quando o ID buscado não estiver no padrão esperado
 */
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

/**
 * Criar um novo funcionário na tabela
 * @param employeeData Dados do novo funcionário
 * @returns Funcionário criado
 */
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

/**
 * Atualiza um ou mais dados do funcionário de acordo com seu ID
 * @param id ID de identificação do funcionário
 * @param employeeData Dados do funcionário
 * @returns Funcionário atualizado, null caso não exista para o ID ou
 * um objeto com status 400 quando o ID buscado não estiver no padrão esperado
 */
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

/**
 * Exclui um determinado funcionário pelo seu ID
 * @param id ID de identificação
 * @returns Funcionário excluído, null caso não exista para o ID ou
 * um objeto com status 400 quando o ID buscado não estiver no padrão esperado
 */
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
