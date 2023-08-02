export class User{
    id: number;
    userId:number;
    username: string;
    role: string;
    name: string;
    password?: string;
  }
  
  export class UserDto{
    name: string;
    encodedCredentials: string;
    role: string;
    securityQuestion: string;
    securityAnswer: string;
  }