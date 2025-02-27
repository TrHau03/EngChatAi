const { execSync } = require("child_process")
const path = require("path")

const iosPath = path.join(__dirname, "../ios")

const runCommand = (command) => {
    try {
        execSync(command, { stdio: "inherit" })
    } catch (error) {
        console.error(`Error executing: ${command}`, error)
        process.exit(1)
    }
}

const setupIOS = () => {
    process.chdir(iosPath)
    runCommand("rm -rf ~/Library/Caches/CocoaPods")
    runCommand("rm -rf ~/Library/Developer/Xcode/DerivedData/*")
    runCommand("rm -rf Pods")
    runCommand("rm -rf Podfile.lock")
    runCommand("pod deintegrate")
    runCommand("pod setup")
    runCommand("pod install")

    process.chdir("..")
}

setupIOS()
