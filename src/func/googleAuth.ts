import auth from "@react-native-firebase/auth"
import { GoogleSignin } from "@react-native-google-signin/google-signin"

export async function googleAuthentication() {
    const res = await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
    })
    const signInResult = (await GoogleSignin.signIn()) as any
    let idToken = signInResult.data?.idToken
    if (!idToken) {
        idToken = signInResult.idToken
    }
    if (!idToken) {
        throw new Error("No ID token found")
    }

    const googleCredential = auth.GoogleAuthProvider.credential(signInResult.data!.idToken)

    return auth().signInWithCredential(googleCredential)
}

export async function signOut() {
    auth().signOut()
    await GoogleSignin.revokeAccess()
    await GoogleSignin.signOut()
}
