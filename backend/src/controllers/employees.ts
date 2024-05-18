import { Request, Response } from 'express'
import {
  createEmployeeService,
  deleteEmployeeService,
  getEmployeeService,
  listEmployeesService,
  updateEmployeeService
} from '../services/employees'

async function listEmployeesController(req: Request, res: Response) {
  try {
    const { page, itemsPerPage } = req.query
    const response = await listEmployeesService(
      Number(page) || 1,
      Number(itemsPerPage) || undefined
    )
    res.status(200).send(response)
  } catch (error) {
    res.status(500).send({ error: 'Erro ao processar requisição' })
  }
}

async function getEmployeeController(req: Request, res: Response) {
  try {
    const id = req.params.id
    const response = await getEmployeeService(id)
    if ((response as any)?.status === 400) {
      res.status(400).send({ message: 'ID inválido' })
    } else if (!response) {
      res
        .status(404)
        .send({ message: 'Funcionário não encontrado para o respectivo ID' })
    } else {
      res.status(200).send({ response })
    }
  } catch (error) {
    res.status(500).send({ error: 'Erro ao processar requisição' })
  }
}

async function createEmployeeController(req: Request, res: Response) {
  try {
    const body = req.body
    const fields = ['nome', 'cargo', 'departamento', 'dataAdmissao']
    const payload = {} as {
      nome: string
      cargo: string
      departamento: string
      dataAdmissao: string
    }

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i]

      if (field === 'dataAdmissao') {
        const regexDate = /\d{2}\/\d{2}\/\d{4}/

        if (!regexDate.test(body[field])) {
          return res.status(400).send({
            error: 'Data de admissão deve estar no formato dd/mm/yyyy'
          })
        }
      }

      if (body[field]) payload[field as keyof typeof payload] = body[field]
      else
        return res
          .status(400)
          .send({ error: `Parâmetro '${field}' não enviado` })
    }

    const response = await createEmployeeService(payload)
    return res
      .status(200)
      .send({ message: 'Funcionário inserido com sucesso', response })
  } catch (error) {
    return res.status(500).send({ error: 'Erro ao processar requisição' })
  }
}

async function updateEmployeeController(req: Request, res: Response) {
  try {
    const id = req.params.id
    const body = req.body
    const fields = ['nome', 'cargo', 'departamento', 'dataAdmissao']
    const payload = {} as {
      nome?: string
      cargo?: string
      departamento?: string
      dataAdmissao?: string
    }

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i]

      if (field === 'dataAdmissao' && body[field]) {
        const regexDate = /\d{2}\/\d{2}\/\d{4}/

        if (!regexDate.test(body[field])) {
          return res.status(400).send({
            error: 'Data de admissão deve estar no formato dd/mm/yyyy'
          })
        }
      }

      if (body[field]) payload[field as keyof typeof payload] = body[field]
    }

    const response = await updateEmployeeService(id, payload)

    if ((response as any)?.status === 400) {
      return res.status(400).send({ message: 'ID inválido' })
    } else if (!response) {
      return res
        .status(404)
        .send({ message: 'Funcionário não encontrado para o respectivo ID' })
    } else {
      return res
        .status(200)
        .send({ message: 'Funcionário atualizado com sucesso' })
    }
  } catch (error) {
    return res.status(500).send({ error: 'Erro ao processar requisição' })
  }
}

async function deleteEmployeeController(req: Request, res: Response) {
  try {
    const id = req.params.id
    const response = await deleteEmployeeService(id)
    if ((response as any)?.status === 400) {
      res.status(400).send({ message: 'ID inválido' })
    } else if (!response) {
      res
        .status(404)
        .send({ message: 'Funcionário não encontrado para o respectivo ID' })
    } else {
      res.status(200).send({ message: 'Funcionário deletado com sucesso' })
    }
  } catch (error) {
    res.status(500).send({ error: 'Erro ao processar requisição' })
  }
}

export {
  createEmployeeController,
  listEmployeesController,
  getEmployeeController,
  updateEmployeeController,
  deleteEmployeeController
}
