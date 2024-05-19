'use client'

import { EmployeesProvider } from './employees'

const Provider = ({ children }: any) => {
  return <EmployeesProvider>{children}</EmployeesProvider>
}

export default Provider
