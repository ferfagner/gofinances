import { createContext, ReactNode, useContext, useState, useEffect } from 'react'


import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage'


const { CLIENT_ID } = process.env
const { REDIRECT_URI } = process.env


interface AuthProvaiderProps {

    children: ReactNode;

}

interface User {
    id: string,
    name: string;
    email: string;
    photo?: string

}

interface AuthContexData {
    user: User;
    signinWithGoogle(): Promise<void>
    signInApple():Promise<void>,
    signOut():Promise<void>,
    userLoading: boolean
}
interface AuthorizationResponse {
    params: {
        access_token: string;
    };
    type: string;
}

const AuthContext = createContext({} as AuthContexData);

function AuthProvaider({ children }: AuthProvaiderProps) {

    const [users, setUsers] = useState<User>({} as User)
    const [userLoading, setUserLoading] = useState(true);
    const userStorageKey = '@gofinances:user';
    async function signinWithGoogle() {


        try {

            const RESPONSE_TYPE = 'token'
            const SCOPE = encodeURI('profile email')

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

            const { type, params } = await AuthSession.
                startAsync({ authUrl }) as AuthorizationResponse

            if (type === 'success') {
                const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`)
                const userInfo = await response.json()
                const userLogged = {
                    id: userInfo.id,
                    email: userInfo.email,
                    name: userInfo.given_name,
                    photo: userInfo.picture
                }

                setUsers(userLogged)
                await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))

            }


        } catch (error) {

        }

    }

    async function signInApple() {
        
        try {

            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,

                ]
            });

            if (credential) {

                const userLogged = {
                    id: String(credential.user),
                    email: credential.email!,
                    name: credential.fullName?.givenName!,
                    photo: undefined
                }

                setUsers(userLogged)
                await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))

            }

           


        } catch (error) {
        }

    }

    async function signOut(){
        console.log('deslogou')
        setUsers({} as User)

        await AsyncStorage.removeItem(userStorageKey)

    }

    useEffect(() => {
        async function loadUserStorageData(){
            const userStorage = await AsyncStorage.getItem(userStorageKey)

            if(userStorage){
                const userLogged = JSON.parse(userStorage) as User;
                setUsers(userLogged)
            }
            setUserLoading(false)

        }

        loadUserStorageData()

    },[])

    return (
       
        <AuthContext.Provider value={{
            user: users,
            signinWithGoogle,
            signInApple,
            signOut,
            userLoading
        }}>
            {children}
        </AuthContext.Provider>
      
    )

}

function useAuth() {
    const context = useContext(AuthContext)

    return context;
}

export { useAuth, AuthProvaider, }