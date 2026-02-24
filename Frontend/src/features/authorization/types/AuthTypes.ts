export type AuthResult<T> = {
    success: boolean,
    data?: T,
    error?: string
}

export type AccountResult<T> = {
    success: boolean,
    data?: T,
    error?: string
}

export type UserDto = {
    Id: string,
    UserName: string,
    Email: string
}

export interface AuthFormProps {
  OnSuccess: () => void;
  OnError: (message: string) => void;
}

export type AuthRoute = {
    mode: "register" | "login" | "forgot" | "reset" | "change" | "info";
}