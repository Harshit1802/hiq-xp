export interface User {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    isDisabled: boolean;
    userName: string;
    password: string;
    email: string;
    accessToken: string;
}
export interface LoginInfo { 
    email: string
    password: string;
}
