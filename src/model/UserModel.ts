export default interface UserModel {
    id: string
    name: string
    email: string
    token: string
    provider: string
    avatarUrl: string | null
}
