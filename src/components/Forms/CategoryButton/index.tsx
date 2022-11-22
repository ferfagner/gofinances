import React from "react";
import { 
    Conteiner,
    Category,
    Icon
 } from './styles'

 interface Props {
    title: string;
    onPress: () => void;
 }

export function CategoryButton({title, onPress}: Props){

    return(
        <Conteiner onPress={onPress}>
            <Category>{title}</Category>
            <Icon name="chevron-down"/>
        </Conteiner>
    )

}