import { Controller, All, Req, Res, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import axios, { AxiosError } from 'axios';

@Controller('auth')
export class AuthController {
  private readonly authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://localhost:3001';

  @All('*')
  async proxyToAuthService(@Req() req: Request, @Res() res: Response) {
    try {
      const { method, url, headers, body } = req;
      
      // Remove host header to avoid conflicts
      const forwardHeaders = { ...headers };
      delete forwardHeaders.host;
      
      const targetUrl = `${this.authServiceUrl}${url}`;
      
      const response = await axios({
        method: method as any,
        url: targetUrl,
        headers: forwardHeaders,
        data: body,
        timeout: 10000,
      });

      // Forward response headers
      Object.keys(response.headers).forEach(key => {
        res.setHeader(key, response.headers[key]);
      });

      res.status(response.status).json(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Forward error response from auth service
        res.status(error.response.status).json(error.response.data);
      } else {
        // Handle network errors
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(HttpStatus.SERVICE_UNAVAILABLE).json({
          success: false,
          message: 'Auth service unavailable',
          error: errorMessage,
        });
      }
    }
  }
}
