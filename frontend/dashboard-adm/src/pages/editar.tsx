import { useEmployeeList } from '@/providers/employees'
import api from '@/services'
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  useToast
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { IoArrowBack } from 'react-icons/io5'

export default function EditPage() {
  const { selectedEmployee, setUpdateList } = useEmployeeList()
  const router = useRouter()
  const toast = useToast()

  const [name, setName] = useState('')
  const [position, setPosition] = useState('')
  const [department, setDepartment] = useState('')
  const [admission, setAdmission] = useState('')
  const [saving, setSaving] = useState(false)

  const updateEmplyeeData = (event: any) => {
    const inputName = event.target.name
    const inputValue = event.target.value
    if (inputName === 'name') setName(inputValue)
    else if (inputName === 'position') setPosition(inputValue)
    else if (inputName === 'department') setDepartment(inputValue)
    else if (inputName === 'admission') setAdmission(inputValue)
  }

  const saveEmployee = (event: any) => {
    setSaving(true)
    event.preventDefault()
    const employeeDataUpdate = {
      nome: name,
      cargo: position,
      departamento: department,
      dataAdmissao: admission.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1')
    }

    const createToast = (success: boolean, description: string) => {
      return toast({
        title: success ? 'Sucesso' : 'Não foi possível salvar dados',
        description: description,
        status: success ? 'success' : 'error',
        duration: 5000,
        isClosable: true
      })
    }

    if (selectedEmployee._id) {
      api
        .put(`/api/employees/${selectedEmployee._id}`, employeeDataUpdate)
        .then(() => {
          setUpdateList(true)
          createToast(true, 'Dados atualizados com sucesso')
        })
        .catch(error => {
          console.error(error)
          createToast(false, error.message || '')
        })
        .finally(() => {
          setSaving(false)
        })
    } else {
      api
        .post('/api/employees', employeeDataUpdate)
        .then(response => {
          console.log(response)
          setUpdateList(true)
          createToast(true, 'Funcionário cirado com sucesso')
        })
        .catch(error => {
          console.log(error)
          createToast(false, error.message || '')
        })
        .finally(() => setSaving(false))
    }
  }

  useEffect(() => {
    setName(selectedEmployee?.nome)
    setPosition(selectedEmployee?.cargo)
    setDepartment(selectedEmployee?.departamento)
    setAdmission(
      selectedEmployee?.dataAdmissao.replace(
        /(\d{2})\/(\d{2})\/(\d{4})/,
        '$3-$2-$1'
      )
    )
  }, [selectedEmployee])

  return (
    <Flex
      width={'90vw'}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      margin={'auto'}
      marginTop={'4%'}
    >
      <Button
        width={'8%'}
        color={'blueviolet'}
        onClick={() => router.push('/')}
      >
        <IoArrowBack></IoArrowBack>
      </Button>
      <form onSubmit={saveEmployee}>
        <Flex
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'space-evenly'}
          width={'65%'}
          height={'70vh'}
        >
          <FormControl isRequired>
            <FormLabel>Nome</FormLabel>
            <Input
              defaultValue={name}
              name="name"
              onChange={updateEmplyeeData}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Cargo</FormLabel>
            <Input
              defaultValue={position}
              name="position"
              onChange={updateEmplyeeData}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Departamento</FormLabel>
            <Input
              defaultValue={department}
              name="department"
              onChange={updateEmplyeeData}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Data de Admissão</FormLabel>
            <Input
              type="date"
              defaultValue={admission}
              name="admission"
              onChange={updateEmplyeeData}
            />
          </FormControl>
          {saving ? (
            <Button
              width={'15%'}
              isLoading
              loadingText="Salvando"
              colorScheme="teal"
              variant="outline"
            ></Button>
          ) : (
            <Button color={'green'} type="submit" width={'15%'}>
              Salvar
            </Button>
          )}
        </Flex>
      </form>
    </Flex>
  )
}
