import { logger } from "@/core/utils"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { GoogleAuthProvider, getAuth, signInWithCredential, signOut } from "firebase/auth"

export async function googleAuthentication() {
    try {
        const auth = getAuth()
        logger.info("Google auth init", null)
        const test = await GoogleSignin.hasPlayServices({
            showPlayServicesUpdateDialog: true,
        })
        logger.info("Google hasPlayServices", test)
        const signInResult = (await GoogleSignin.signIn()) as any
        console.log("UserInfo : " + signInResult)

        let idToken = signInResult.data?.idToken
        if (!idToken) {
            idToken = signInResult.idToken
        }
        if (!idToken) {
            logger.info("Error ID token", idToken)
            throw new Error("No ID token found")
        }
        const credential = GoogleAuthProvider.credential(idToken)
        const signInWithPopupResult = await signInWithCredential(auth, credential)
        return signInWithPopupResult
    } catch (error: any) {
        logger.error("Google auth error", error)
    }
}

export async function logOut() {
    const auth = getAuth()
    await GoogleSignin.signOut()
    await GoogleSignin.revokeAccess()
    try {
        await signOut(auth)
        return true
    } catch (error: any) {
        logger.error("Logout error", error)
        return false
    }
}
