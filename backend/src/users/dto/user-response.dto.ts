export class UserResponseDto {
  uuid: number;
  username: string;
  email: string;
  timestamp: Date;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
