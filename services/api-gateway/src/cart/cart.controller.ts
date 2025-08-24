import { Controller, All, Req, Res, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import axios, { AxiosError } from 'axios';

@Controller('cart')
export class CartController {
  private readonly cartServiceUrl = process.env.CART_SERVICE_URL || 'http://localhost:12000';

  @All('*')
  async proxyToCartService(@Req() req: Request, @Res() res: Response) {
    try {
      const { method, url, headers, body } = req;
      
      // Remove host header to avoid conflicts
      const forwardHeaders = { ...headers };
      delete forwardHeaders.host;
      
      const targetUrl = `${this.cartServiceUrl}${url}`;
      
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
      if (error instanceof AxiosError) {
        const status = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
        const message = error.response?.data?.message || 'Cart service error';
        res.status(status).json({ message, error: 'Cart Service Error' });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'Internal server error',
          error: 'Gateway Error'
        });
      }
    }
  }
}
