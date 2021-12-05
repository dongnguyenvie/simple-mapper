import { Injectable } from '@nestjs/common';
import { Exclude, mapper } from '@nolanx/mapper/core';

@Injectable()
export class DevService {
  constructor() {
    const rawUser = {
      firstName: 'name',
      lastName: 'lastName',
    };

    class User {
      firstName = 'default first';

      @Exclude()
      lastName = 'default last';

      @Exclude()
      public fullName() {
        return this.firstName + ' ' + this.lastName;
      }
    }

    const userInstance = mapper.objectToInstance(User, rawUser);
    console.log('user instance', userInstance);
  }
}
