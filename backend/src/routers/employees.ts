import { Router } from 'express'
import {
  createEmployeeController,
  deleteEmployeeController,
  getEmployeeController,
  listEmployeesController,
  updateEmployeeController
} from '../controllers/employees'

const employees = Router()

employees.get('/api/employees', listEmployeesController)
employees.get('/api/employees/:id', getEmployeeController)
employees.post('/api/employees', createEmployeeController)
employees.put('/api/employees/:id', updateEmployeeController)
employees.delete('/api/employees/:id', deleteEmployeeController)


export default employees
