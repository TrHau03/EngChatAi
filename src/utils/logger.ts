export const logger = {
    info: (title: string, message: any) => {
        if (__DEV__) {
            console.log(`[INFO] ${title}: ${message}`)
        }
    },
    error: (message: string) => {
        if (__DEV__) {
            console.log(`[ERROR] ${message}`)
        }
    },
}
