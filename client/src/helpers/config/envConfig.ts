export const getBaseUrl = ():string => {
    return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api/v1"
}
export const baseUrl = ():string => {
    return process.env.BASE_URI || "http://localhost:3001/"
}