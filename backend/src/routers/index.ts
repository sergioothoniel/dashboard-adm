import { Router } from 'express'
import employees from './employees'

export const router = Router()

router.use(employees)