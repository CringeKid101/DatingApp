export type User = {
     id: string,
     email: string,
     name: string,
     token: string,
     imageUrl?: string
}

export type LoginCreds = {
     email: string,
     password: string

}
export type RegisterCreds = {
     email: string,
     displayName: string,
     password: string
}