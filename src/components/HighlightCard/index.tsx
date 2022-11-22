import React from "react";

import {
    Conteiner,
    Header,
    Footer,
    Amount,
    LastTransaction,
    Icon,
    Title

} from './styles'

interface Porps{
    type: 'up' | 'down' | 'total';
    title: string;
    amount: string;
    lastTransection: string;
    
}

const icon = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle',
    total: 'dollar-sign'

}

export function HighlightCard({title, amount, lastTransection, type} : Porps) {

    return (
        <Conteiner type={type}>
            <Header>
                <Title
                type={type}
                >{title}</Title>
                <Icon name={icon[type]} type={type}/>
            </Header>
            <Footer>
                <Amount
                type={type}
                >
                {amount}
                </Amount>
                <LastTransaction
                type={type}
                >{lastTransection}</LastTransaction>
            </Footer>
        </Conteiner>

    )

}