import React from "react";
import {TextInputProps} from 'react-native'

import { Conteiner } from './styles'

interface Props extends TextInputProps{
    active?: boolean
}

export function Input({active=false,...rest}: Props){

    return(
        <Conteiner 
        active={active}
        {...rest}/>

    )

}