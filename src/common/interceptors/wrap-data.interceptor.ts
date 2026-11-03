import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class WrapDataInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // logic: Intercept request
    console.log('Before, Request..... from WrapDataInterceptor');

    return next.handle().pipe(
      map((data) => {
        // logic: Intercept response
        console.log('After, Response..... from WrapDataInterceptor', data);
        return { response: data };
      }),
    );
  }
}
