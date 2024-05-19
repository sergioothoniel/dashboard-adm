import { IEmployee } from '@/types/employee'
import { useRouter } from 'next/router'
import { MdBuild, MdDelete } from 'react-icons/md'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'
import {
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  ButtonGroup
} from '@chakra-ui/react'
import api from '@/services'
import { useEmployeeList } from '@/providers/employees'
import { useEffect, useState } from 'react'

export default function EmployeesTable({
  employessList
}: {
  employessList: IEmployee[]
}) {
  const { setUpdateList, setResponseError, setSelectedEmployee } =
    useEmployeeList()
  const router = useRouter()

  const [curEmployeeList, setCurEmployeeList] = useState(employessList)
  const [orderNamePlus, setOrderNamePlus] = useState(false)
  const [orderPositionPlus, setOrderPositionPlus] = useState(false)
  const [orderDepartmentPlus, setOrderDepartmentPlus] = useState(false)

  useEffect(() => {
    setCurEmployeeList(employessList)
  }, [employessList])

  const orderList = (order: 'nome' | 'cargo' | 'departamento') => {
    if (order === 'nome') {
      const result = [...curEmployeeList].sort((a, b) => {
        if (orderNamePlus) {
          setOrderNamePlus(!orderNamePlus)
          return b.nome.localeCompare(a.nome)
        } else {
          setOrderNamePlus(!orderNamePlus)
          return a.nome.localeCompare(b.nome)
        }
      })
      setCurEmployeeList(result)
    } else if (order === 'cargo') {
      const result = [...curEmployeeList].sort((a, b) => {
        if (orderPositionPlus) {
          setOrderPositionPlus(!orderPositionPlus)
          return b.cargo.localeCompare(a.cargo)
        } else {
          setOrderPositionPlus(!orderPositionPlus)
          return a.cargo.localeCompare(b.cargo)
        }
      })
      setCurEmployeeList(result)
    } else if (order === 'departamento') {
      const result = [...curEmployeeList].sort((a, b) => {
        if (orderDepartmentPlus) {
          setOrderDepartmentPlus(!orderDepartmentPlus)
          return b.departamento.localeCompare(a.departamento)
        } else {
          setOrderDepartmentPlus(!orderDepartmentPlus)
          return a.departamento.localeCompare(b.departamento)
        }
      })
      setCurEmployeeList(result)
    }
  }

  const deleteEmployee = (idEmployee: string) => {
    api
      .delete('/api/employees/' + idEmployee)
      .then(() => setUpdateList(true))
      .catch(error => {
        console.error(error)
        setResponseError(true)
      })
  }

  const editEmployee = (employee: IEmployee) => {
    setSelectedEmployee(employee)
    router.push('/editar')
  }

  return (
    <TableContainer width={'95vw'}>
      <Table variant="simple">
        <Thead>
          <Tr width={'100%'}>
            <Th width={'35%'} display={'flex'}>
              <span>Nome</span>
              <Button
                size={'minimum'}
                color={'black'}
                onClick={() => orderList('nome')}
              >
                {orderNamePlus ? (
                  <FaCaretUp></FaCaretUp>
                ) : (
                  <FaCaretDown></FaCaretDown>
                )}
              </Button>
            </Th>
            <Th width={'30%'}>
              <span>Cargo</span>
              <Button
                size={'minimum'}
                color={'black'}
                onClick={() => orderList('cargo')}
              >
                {orderPositionPlus ? (
                  <FaCaretUp></FaCaretUp>
                ) : (
                  <FaCaretDown></FaCaretDown>
                )}
              </Button>
            </Th>
            <Th width={'30%'}>
              <span>Departamento</span>
              <Button
                size={'minimum'}
                color={'black'}
                onClick={() => orderList('departamento')}
              >
                {orderDepartmentPlus ? (
                  <FaCaretUp></FaCaretUp>
                ) : (
                  <FaCaretDown></FaCaretDown>
                )}
              </Button>
            </Th>
            <Th width={'5%'}>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {curEmployeeList.map(employee => {
            return (
              <Tr key={employee._id}>
                <Td>{employee.nome}</Td>
                <Td>{employee.cargo}</Td>
                <Td>{employee.departamento}</Td>
                <Td>
                  <ButtonGroup spacing={2} boxSize={'min-content'}>
                    <Button
                      colorScheme="blue"
                      variant="solid"
                      onClick={() => editEmployee(employee)}
                    >
                      <MdBuild />
                    </Button>
                    <Button
                      colorScheme="red"
                      variant="solid"
                      onClick={() => deleteEmployee(employee._id)}
                    >
                      <MdDelete />
                    </Button>
                  </ButtonGroup>
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
