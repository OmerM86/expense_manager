import { UserResponseDto } from './user-response.dto';

export class UserJwtResponseDto {
  user: UserResponseDto;
  accessToken: string;

  constructor(partial: Partial<UserJwtResponseDto>) {
    Object.assign(this, partial);
  }
}
