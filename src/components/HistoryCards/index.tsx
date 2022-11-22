import React from "react";

import {
    Conteiner,
    Title,
    Amount

} from './styles'

interface Prorps{
    title: string,
    color: string,
    amount: string
}


export function HistoryCards({title, amount, color}: Prorps){

    return(

        <Conteiner color={color}>
            <Title>{title}</Title>
            <Amount>{amount}</Amount>

        </Conteiner>

    )

}