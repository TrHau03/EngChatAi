export const logger = {
    object: (data: any) => {
        if (__DEV__) {
            console.log(data)
        }
    },
    info: (title: string, message: any) => {
        if (__DEV__) {
            console.log(`[INFO] ${title}: ${message}`)
        }
    },
    error: (title: string, message: string) => {
        if (__DEV__) {
            console.log(`[ERROR] ${title}: ${message}`)
        }
    },
}
