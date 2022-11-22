import React from "react";
import {categories} from '../../utils/categories'

import {
    Conteiner,
    Title,
    Amount,
    Icon,
    CategoryName,
    Date,
    Footer,
    Category


} from './styles'



export interface TransectionCardProps {

    type: 'up' | 'down',
    name: string,
    amount: string,
    date: string,
    category: string

}

interface data {

    data: TransectionCardProps

}


export function TransectionCard({data}: data){

    const categoriys = categories.filter(item => item.key === data.category        
        )[0];

    return(
        <Conteiner>
            <Title>{data.name}</Title>
            <Amount type={data.type}>
                {data.type === 'down' && '- '}
                {data.amount}
                </Amount>
            <Footer>
                <Category>
                    <Icon name={categoriys.icon}/>
                    <CategoryName>{categoriys.name}</CategoryName>
                </Category>
                <Date>{data.date}</Date>
            </Footer>

        </Conteiner>

    )


}