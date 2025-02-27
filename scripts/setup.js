const fs = require("fs")
const path = require("path")

const mode = process.argv[2] // 'dev' or 'prod'

const setup = () => {
    if (mode === "dev") {
        copyFile("google-services.json", "android/app")
        copyFile("GoogleService-Info.plist", "ios")
        copyFile(".env.dev", ".env")
    } else if (mode === "prod") {
        copyFile("configs/prod/google-services.json", "android/app")
        copyFile("configs/prod/GoogleService-Info.plist", "ios")
        copyFile("configs/prod/.env.prod", ".env")
    } else {
        console.error("Invalid mode. Please use 'dev' or 'prod'.")
        process.exit(1)
    }
}

function copyFile(source, destination) {
    if (!source) return
    const destPath = destination.endsWith(".env") ? destination : path.join(destination, path.basename(source))
    fs.copyFile(source, destPath, (err) => {
        if (err) {
            console.error(`Failed to copy ${source} to ${destPath}:`, err)
        } else {
            console.log(`Copied ${source} to ${destPath}`)
        }
    })
}

setup()
