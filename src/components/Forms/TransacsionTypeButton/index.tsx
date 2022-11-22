import React from "react";

import {TouchableOpacityProps} from 'react-native'

import { 
    Conteiner,
    Icon,
    Title

} from './styles'

const icons = {
    up: 'arrow-up-circle',
    down:'arrow-down-circle'
}

interface Props extends TouchableOpacityProps{
    title:string,
    type: 'up' | 'down',
    isActive: boolean
}

export function TransacsionTypeButton({title, type, isActive, ...rest}: Props){

    return(
       <Conteiner
       type={type}
       isActive={isActive}
       {...rest}>
        <Icon type={type} name={icons[type]}/>
        <Title>{title}</Title>
       </Conteiner>

    )

}