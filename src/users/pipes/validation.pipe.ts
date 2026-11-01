import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class CustomValidationPipe implements PipeTransform {
  transform(value: any, _metadata: ArgumentMetadata) {
    // console.log('Custom validation pipe: ', value);

    //! You can add custom validation logic here, for example:
    if (typeof value !== 'string') {
      throw new Error('Query parameter must be a string');
    }

    return value;
  }
}

//! @ use it in the controller like this:
// @Get()
// findAll(@Query('username', CustomValidationPipe) username: string): UserEntity[] {
//   return this.users;
// }
