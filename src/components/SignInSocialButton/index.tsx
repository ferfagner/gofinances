import React from "react";
import { SvgProps } from 'react-native-svg';
import { RectButtonProps, GestureHandlerRootView } from 'react-native-gesture-handler'
import {TouchableOpacityProps} from 'react-native'



import {
    Button,
    ImagemContainer,
    Text

} from "./styles"

interface Props extends TouchableOpacityProps {
    title: string;
    svg: React.FC<SvgProps>

}

export function SignInSocialButton({ title, svg: SVG, ...rest }: Props) {
    return (
        <GestureHandlerRootView>
        <Button {...rest}>
            <ImagemContainer>
                <SVG />
            </ImagemContainer>
            <Text>{title}</Text>
        </Button>
        </GestureHandlerRootView>



    )
}