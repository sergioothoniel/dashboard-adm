import EmployeesTable from '@/components/table'
import { useEmployeeList } from '@/providers/employees'
import { Flex, Input, Select, Button, Container, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md'
import { FaCirclePlus } from 'react-icons/fa6'
import { useRouter } from 'next/router'
import { IEmployee } from '@/types/employee'

export default function Home() {
  const { employeesList, setPage, setItemsPerPage, setSelectedEmployee } =
    useEmployeeList()
  const router = useRouter()

  const [employees, setEmployees] = useState([] as IEmployee[])
  const [curPage, setCurPage] = useState(1)
  const [nextPage, setNextPage] = useState(2)
  const [previousPage, setPreviousPage] = useState(0)
  const [totalPagesState, setTotalPagesState] = useState(1)

  const changeItemsPerPage = (event: any) => {
    setItemsPerPage(event.target.value)
  }

  const filterList = (event: any) => {
    const value = event.target?.value as string
    if (value) {
      setEmployees(
        employeesList.rows.filter((employee: IEmployee) =>
          employee.nome.toUpperCase().includes(value.toUpperCase())
        )
      )
    } else {
      setEmployees(employeesList.rows || [])
    }
  }

  useEffect(() => {
    setEmployees(employeesList.rows || [])
    setCurPage(employeesList.page)
    setTotalPagesState(employeesList.totalPages)
    setNextPage(curPage + 1)
    setPreviousPage(curPage - 1)
  }, [employeesList, curPage])

  return (
    <main>
      <Flex display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <Flex width={'85vw'} height={'10vh'} alignItems={'center'}>
          <Container
            margin={'0 auto'}
            display={'flex'}
            alignItems={'center'}
            fontSize={'x-large'}
            fontFamily={'inherit'}
          >
            Dashboard Funcionários
          </Container>
          <Input
            width={'30%'}
            placeholder="Digite o nome do funcionário para buscar"
            onChange={filterList}
          ></Input>
          <Button
            color={'green'}
            alignItems={'center'}
            onClick={() => {
              router.push('/editar')
              setSelectedEmployee({
                nome: '',
                cargo: '',
                departamento: '',
                dataAdmissao: ''
              })
            }}
          >
            <FaCirclePlus></FaCirclePlus> <Text>Adicionar</Text>
          </Button>
        </Flex>

        <EmployeesTable employessList={employees} />

        <Flex display={'flex'} width={'85vw'} justifyContent={'space-between'}>
          <Flex
            display={'flex'}
            alignItems={'center'}
            width={'15%'}
            justifyContent={'space-between'}
          >
            <Button
              visibility={previousPage ? 'visible' : 'hidden'}
              disabled={!!previousPage}
              onClick={() => setPage(previousPage)}
            >
              <MdNavigateBefore></MdNavigateBefore>
            </Button>
            <span>
              {curPage} - {totalPagesState}
            </span>

            <Button
              visibility={totalPagesState > curPage ? 'visible' : 'hidden'}
              disabled={totalPagesState > curPage}
              onClick={() => setPage(nextPage)}
            >
              <MdNavigateNext></MdNavigateNext>
            </Button>
          </Flex>

          <Flex
            display={'flex'}
            alignItems={'center'}
            width={'20%'}
            justifyContent={'space-between'}
          >
            <span>Itens por página:</span>
            <Select
              variant="filled"
              width={'auto'}
              onChange={changeItemsPerPage}
              defaultValue={'20'}
            >
              <option value="1">1</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </Select>
          </Flex>
        </Flex>
      </Flex>
    </main>
  )
}
