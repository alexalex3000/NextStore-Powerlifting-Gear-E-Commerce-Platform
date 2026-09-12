export interface UserData{
    id: string
    userId: string
    expiresAt: Date
    user: {
        id: string
        role: "user" | "admin"
        email: string
        passwordHash: string
        firstName: string
        lastName: string
        phoneNumber: string | null
        logoUrl: string | null
    }
}