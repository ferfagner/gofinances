import React from "react";
import {TouchableOpacityProps} from 'react-native'

import { 
    Conteiner,
    Title
   

} from './styles'

interface Porps extends TouchableOpacityProps{
    title: string;
};

export function Button({title, ...rest}: Porps){

    return(
        <Conteiner {...rest}>
          
            <Title>
                {title}
            </Title>
        </Conteiner>

    )

}