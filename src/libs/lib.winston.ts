import winston, { Logger } from 'winston'
import RedisTransport from '@codibre/winston-redis'
import { v4 as uuid } from 'uuid'
import { Request, Response } from 'express'
import { getReasonPhrase } from 'http-status-codes'
import onFinished from 'on-finished'

export class Winston {
  private logger: Logger
  private consoleTransport: any

  constructor(className?: string, funcName?: string) {
    this.consoleTransport = process.env.NODE_ENV === 'development' ? new winston.transports.Console() : undefined
    this.logger = winston.createLogger({
      defaultMeta: {
        spanId: uuid(),
        className: className,
        functionName: funcName
      },
      transports: [new RedisTransport(), this.consoleTransport]
    })
  }

  info(message: string, req: Request, res: Response) {
    const logger: Logger = this.logger

    onFinished(res, function (err, { statusCode }) {
      logger.level = 'info'
      logger.format = winston.format.combine(winston.format.timestamp(), winston.format.json())
      logger.child({ remoteAddress: req.ip, method: req.method, host: req.hostname, route: `${req.baseUrl}${req.path}`, code: statusCode, status: getReasonPhrase(statusCode) }).info(message)
    })
  }

  error(message: string, req: Request, res: Response) {
    const logger: Logger = this.logger

    onFinished(res, function (err, { statusCode }) {
      logger.level = 'error'
      logger.format = winston.format.combine(winston.format.timestamp(), winston.format.errors({ stack: true }), winston.format.logstash())
      logger.child({ remoteAddress: req.ip, method: req.method, host: req.hostname, route: `${req.baseUrl}${req.path}`, code: statusCode, status: getReasonPhrase(statusCode) }).error(message)
    })
  }

  debug(message: string, req: Request, res: Response) {
    const logger: Logger = this.logger

    onFinished(res, function (err, { statusCode }) {
      logger.level = 'debug'
      logger.format = winston.format.combine(winston.format.timestamp(), winston.format.json())
      logger.child({ remoteAddress: req.ip, method: req.method, host: req.hostname, route: `${req.baseUrl}${req.path}`, code: statusCode, status: getReasonPhrase(statusCode) }).debug(message)
    })
  }

  warning(message: string, req: Request, res: Response) {
    const logger: Logger = this.logger

    onFinished(res, function (err, { statusCode }) {
      logger.level = 'warn'
      logger.format = winston.format.combine(winston.format.timestamp(), winston.format.json())
      logger.child({ remoteAddress: req.ip, method: req.method, host: req.hostname, route: `${req.baseUrl}${req.path}`, code: statusCode, status: getReasonPhrase(statusCode) }).warn(message)
    })
  }
}
