import { Request, Response, Handler, NextFunction } from 'express'
import { OutgoingMessage } from 'http'

import { ActivityGroupsService } from '@services/service.activityGroups'
import { Controller, Inject } from '@helpers/helper.di'
import { APIResponse } from '@helpers/helper.apiResponse'
import { rawParser } from '@helpers/helper.rawParser'
import { Winston } from '@libs/lib.winston'

@Controller()
export class ActivityGroupsController {
  constructor(@Inject('ActivityGroupsService') private service: ActivityGroupsService) {}

  createActivityGroups(): Handler {
    return async (req: Request, res: Response, next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const response: APIResponse = await this.service.createActivityGroups(rawParser(req.body))
        new Winston('ActivityGroupsController', 'createActivityGroups').info(response.stat_message, req, res)

        return res.status(response.stat_code).json(response)
      } catch (e: any) {
        new Winston('ActivityGroupsController', 'createActivityGroups').error(e.stat_message, req, res)

        return res.status(e.stat_code).json(e)
      }
    }
  }

  getAllActivityGroups(): Handler {
    return async (req: Request, res: Response, next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const response: APIResponse = await this.service.getAllActivityGroups()
        new Winston('ActivityGroupsController', 'getAllActivityGroups').info(response.stat_message, req, res)

        return res.status(response.stat_code).json(response)
      } catch (e: any) {
        new Winston('ActivityGroupsController', 'getAllActivityGroups').error(e.stat_message, req, res)

        return res.status(e.stat_code).json(e)
      }
    }
  }

  getActivityGroupsById(): Handler {
    return async (req: Request, res: Response, next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const response: APIResponse = await this.service.getActivityGroupsById(req.params as any)
        new Winston('ActivityGroupsController', 'getActivityGroupsById').info(response.stat_message, req, res)

        return res.status(response.stat_code).json(response)
      } catch (e: any) {
        new Winston('ActivityGroupsController', 'getActivityGroupsById').error(e.stat_message, req, res)

        return res.status(e.stat_code).json(e)
      }
    }
  }

  deleteActivityGroupsById(): Handler {
    return async (req: Request, res: Response, next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const response: APIResponse = await this.service.deleteActivityGroupsById(req.params as any)
        new Winston('ActivityGroupsController', 'deleteActivityGroupsById').info(response.stat_message, req, res)

        return res.status(response.stat_code).json(response)
      } catch (e: any) {
        new Winston('ActivityGroupsController', 'deleteActivityGroupsById').error(e.stat_message, req, res)

        return res.status(e.stat_code).json(e)
      }
    }
  }

  updateActivityGroupsById(): Handler {
    return async (req: Request, res: Response, next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const response: APIResponse = await this.service.updateActivityGroupsById(req.params as any, rawParser(req.body))
        new Winston('ActivityGroupsController', 'updateActivityGroupsById').info(response.stat_message, req, res)

        return res.status(response.stat_code).json(response)
      } catch (e: any) {
        new Winston('ActivityGroupsController', 'updateActivityGroupsById').error(e.stat_message, req, res)

        return res.status(e.stat_code).json(e)
      }
    }
  }
}
