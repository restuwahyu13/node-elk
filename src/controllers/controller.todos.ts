import { Request, Response, Handler, NextFunction } from 'express'
import { OutgoingMessage } from 'http'

import { TodosService } from '@services/service.todos'
import { Controller, Inject } from '@helpers/helper.di'
import { APIResponse } from '@helpers/helper.apiResponse'
import { rawParser } from '@helpers/helper.rawParser'
import { Winston } from '@libs/lib.winston'

@Controller()
export class TodosController {
  constructor(@Inject('TodosService') private service: TodosService) {}

  createTodos(): Handler {
    return async (req: Request, res: Response, next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const response: APIResponse = await this.service.createTodos(rawParser(req.body))
        new Winston('TodosController', 'createTodos').info(response.stat_message, req, res)

        return res.status(response.stat_code).json(response)
      } catch (e: any) {
        new Winston('TodosController', 'createTodos').error(e.stat_message, req, res)

        return res.status(e.stat_code).json(e)
      }
    }
  }

  getAllTodos(): Handler {
    return async (req: Request, res: Response, next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const response: APIResponse = await this.service.getAllTodos(req)
        new Winston('TodosController', 'getAllTodos').info(response.stat_message, req, res)

        return res.status(response.stat_code).json(response)
      } catch (e: any) {
        new Winston('TodosController', 'getAllTodos').error(e.stat_message, req, res)

        return res.status(e.stat_code).json(e)
      }
    }
  }

  getTodosById(): Handler {
    return async (req: Request, res: Response, next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const response: APIResponse = await this.service.getTodosById(req.params as any)
        new Winston('TodosController', 'getTodosById').info(response.stat_message, req, res)

        return res.status(response.stat_code).json(response)
      } catch (e: any) {
        new Winston('TodosController', 'getTodosById').error(e.stat_message, req, res)
        return res.status(e.stat_code).json(e)
      }
    }
  }

  deleteTodosById(): Handler {
    return async (req: Request, res: Response, next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const response: APIResponse = await this.service.deleteTodosById(req.params as any)
        new Winston('TodosController', 'deleteTodosById').info(response.stat_message, req, res)

        return res.status(response.stat_code).json(response)
      } catch (e: any) {
        new Winston('TodosController', 'deleteTodosById').error(e.stat_message, req, res)

        return res.status(e.stat_code).json(e)
      }
    }
  }

  updateTodosById(): Handler {
    return async (req: Request, res: Response, next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const response: APIResponse = await this.service.updateTodosById(req.params as any, rawParser(req.body))
        new Winston('TodosController', 'updateTodosById').info(response.stat_message, req, res)

        return res.status(response.stat_code).json(response)
      } catch (e: any) {
        new Winston('TodosController', 'updateTodosById').error(e.stat_message, req, res)

        return res.status(e.stat_code).json(e)
      }
    }
  }
}
