export const logger = {
    object: (data: any) => {
        if (__DEV__) {
            console.dir(data)
        }
    },
    info: (title: string, message: any) => {
        if (__DEV__) {
            console.dir(`[INFO] ${title}: ${message}`)
        }
    },
    error: (title: string, message: string) => {
        if (__DEV__) {
            console.dir(`[ERROR] ${title}: ${message}`)
        }
    },
}
