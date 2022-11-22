import React, { useContext, useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { Alert, Platform } from "react-native";
import { useAuth } from '../../hooks/auth'

import { ActivityIndicator } from 'react-native'

import AppleSvg from '../../assets/apple.svg'
import GoogleSvg from '../../assets/google.svg'
import LogoSvg from '../../assets/logo.svg'
import { SignInSocialButton } from "../../components/SignInSocialButton";


import {
    Conteiner,
    Header,
    TitleWrapper,
    Title,
    SignInTitle,
    Footer,
    FooterWrapper

} from "./styles"

export function SignIn() {
    const [isLoading, setIsLoading] = useState(false)
    const { signinWithGoogle, signInApple } = useAuth()

    async function handleSigninWithGoogle() {

        try {
            setIsLoading(true)
            return await signinWithGoogle();


        } catch (error) {
            console.log(error)
            Alert.alert('Não foi possivel conectar a conta Google!')
            setIsLoading(false)
        }

    }

    async function handleSigninWithApple() {

        try {
            setIsLoading(true)
            return await signInApple();


        } catch (error) {
            console.log(error)
            Alert.alert('Não foi possivel conectar a conta Apple!')
            setIsLoading(false)
        }


    }

    return (
        <Conteiner>
            <Header>
                <TitleWrapper>
                    <LogoSvg
                        width={RFValue(120)}
                        height={RFValue(68)}
                    />

                    <Title>
                        Controle suas {`\n`} finanças de forma{`\n`} muito simples!
                    </Title>
                </TitleWrapper>
                <SignInTitle>
                    Faça seu Login com {`\n`}uma das contas abaixo
                </SignInTitle>
            </Header>

            <Footer>
                <FooterWrapper>
                    <SignInSocialButton
                        title="Entrar com o Google!"
                        svg={GoogleSvg}
                        onPress={handleSigninWithGoogle}
                    />
                    {Platform.OS == 'ios' &&
                        <SignInSocialButton
                            title="Entrar com a Apple!"
                            svg={AppleSvg}
                            onPress={handleSigninWithApple}
                        />
                    }
                </FooterWrapper>

                {
                    isLoading && <ActivityIndicator
                        color="red"
                        size="large"
                    />
                }

            </Footer>

        </Conteiner >


    )


}