export interface SignUpDto {
  email: string;
  name: string;
  username: string;
  birthdate: Date | undefined;
  password: string;
  token?: string;
}
