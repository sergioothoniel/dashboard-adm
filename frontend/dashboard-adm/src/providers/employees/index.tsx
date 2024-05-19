import api from '@/services'
import { IEmployee } from '@/types/employee'
import axios from 'axios'
import { createContext, useContext, useState, useEffect } from 'react'

interface IEmployeesList {
  page: number
  totalPages: number
  rows: IEmployee[]
  totalItems: number
}

export const EmployeesContext = createContext({} as any)

export const EmployeesProvider = ({ children }: any) => {
  const [employeesList, setEmployeesList] = useState({} as IEmployeesList)
  const [updateList, setUpdateList] = useState(false)
  const [page, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(20)
  const [loading, setLoading] = useState(false)
  const [responseError, setResponseError] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState({
    _id: '',
    nome: '',
    cargo: '',
    departamento: '',
    dataAdmissao: ''
  })

  useEffect(() => {
    setLoading(true)
    api
      .get(`/api/employees?page=${page}&itemsPerPage=${itemsPerPage}`)
      .then(response => {
        setEmployeesList(response.data)
      })
      .catch(error => {
        console.error(error)
        setResponseError(true)
      })
      .finally(() => {
        setLoading(false)
        setUpdateList(false)
      })
  }, [updateList, itemsPerPage, page])

  return (
    <EmployeesContext.Provider
      value={{
        employeesList,
        setEmployeesList,
        page,
        setPage,
        itemsPerPage,
        setItemsPerPage,
        loading,
        setLoading,
        updateList,
        setUpdateList,
        responseError,
        selectedEmployee,
        setSelectedEmployee
      }}
    >
      {children}
    </EmployeesContext.Provider>
  )
}

export const useEmployeeList = () => useContext(EmployeesContext)
