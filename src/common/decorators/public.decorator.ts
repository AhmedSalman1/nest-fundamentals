import { Reflector } from '@nestjs/core';

export const Public = Reflector.createDecorator<boolean>();

//! Old way of creating a decorator
// import { SetMetadata } from '@nestjs/common';

// export const IS_PUBLIC_KEY = 'Is_Public';

// export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
