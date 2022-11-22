import React, { useState, useCallback } from "react";
import { ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { HighlightCard } from "../../components/HighlightCard";
import { TransectionCard, TransectionCardProps } from "../../components/TransectionCard";
import { useFocusEffect } from '@react-navigation/native'

import { useAuth } from '../../hooks/auth'

import {
    Header,
    Conteiner,
    UserInfo,
    UserName,
    UserGreeting,
    User,
    Photo,
    UserWrapper,
    Icon,
    HighlightCards,
    Transactions,
    Title,
    TransactionList,
    LogoutButton,
    LoadContainer

} from "./styles"
import { loadAsync } from "expo-font";

export interface DataListProps extends TransectionCardProps {
    id: string;
}
interface HighlightProps {
    total: string,
    lastTransacsions: string,
}
interface HighlightData {
    entries: HighlightProps,
    expensives: HighlightProps,
    total: HighlightProps
}

export function Deashboard() {
    const { user, signOut } = useAuth()

    const dataKey = `@gofinance:transecsions_user:${user.id}`;

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<DataListProps[]>([]);
    const [highlightData, setHighlighttData] = useState<HighlightData>({} as HighlightData);

    let entriesTotal = 0;
    let expensiveTotal = 0;


    function getLastTransactionDate(
        collection: DataListProps[],
        type: 'up' | 'down'
    ){  
        const collectionFiltterd = Number(collection.filter(transaction => transaction.type === type));

        if(collectionFiltterd === 0){
            return 0
        }
        

        const lastTransacsions =
            Math.max.apply(Math, collection
                .filter(transaction => transaction.type === type)
                .map(transaction => new Date(transaction.date).getTime()))

        const tratado = Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        }).format(new Date(lastTransacsions));

        return tratado

    }



    async function loadTransactions() {


        const response = await AsyncStorage.getItem(dataKey);
        const transacions = response ? JSON.parse(response) : []


        const transacionsFormated: DataListProps[] = transacions.map(
            (item: DataListProps) => {

                if (item.type === 'up') {
                    entriesTotal += Number(item.amount)
                } else {
                    expensiveTotal += Number(item.amount)
                }


                const amount = Number(item.amount).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                });

                const date = Intl.DateTimeFormat('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit'
                }).format(new Date(item.date));

                return {
                    id: item.id,
                    name: item.name,
                    amount,
                    type: item.type,
                    category: item.category,
                    date,
                }


            });
        setData(transacionsFormated);

        const lestEntries = getLastTransactionDate(transacions, 'up');
        const lestExpensive = getLastTransactionDate(transacions, 'down');




        const total = entriesTotal - expensiveTotal

        const totaldata = {
            entries: {
                total: entriesTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransacsions: lestEntries === 0 
                ? `Não há Transações`
                : `Ultima Entrada dia ${lestEntries}`,
            },
            expensives: {
                total: expensiveTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransacsions: lestExpensive === 0 
                ?`Não há Transações`
                :`Ultima Saida dia ${lestExpensive}`,
            },
            total: {
                total: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransacsions: lestExpensive === 0 
                ?`Não há Transações`
                :`01 a ${lestExpensive}`,
            }
        }

        setHighlighttData(totaldata)






        setIsLoading(false);


    }





    useFocusEffect(useCallback(() => {
        loadAsync
        loadTransactions();


    }, []));

    return (
        <Conteiner>

            {
                isLoading ?
                    <LoadContainer><ActivityIndicator
                        color="red"
                        size="large"
                    /></LoadContainer> : <>


                        <Header>
                            <UserWrapper>
                                <UserInfo>
                                    <Photo source={{ uri: user.photo }} />
                                    <User>
                                        <UserGreeting>Olá,</UserGreeting>
                                        <UserName>{user.name}</UserName>
                                    </User>

                                </UserInfo>
                                <LogoutButton
                                    onPress={signOut}
                                >
                                    <Icon name="power" />
                                </LogoutButton>
                            </UserWrapper>


                        </Header>
                        <HighlightCards>
                            <HighlightCard
                                title="Entradas"
                                amount={highlightData?.entries?.total}
                                type="up"
                                lastTransection={highlightData?.entries?.lastTransacsions}
                            />
                            <HighlightCard
                                title="Saída"
                                amount={highlightData?.expensives?.total}
                                type="down"
                                lastTransection={highlightData?.expensives?.lastTransacsions}
                            />
                            <HighlightCard
                                title="Total"
                                amount={highlightData?.total?.total}
                                type="total"
                                lastTransection={highlightData?.total?.lastTransacsions}
                            />
                        </HighlightCards>
                        <Transactions>
                            <Title>Listagem</Title>
                            <TransactionList
                                data={data}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => <TransectionCard data={item} />}

                            />


                        </Transactions>
                    </>
            }
        </Conteiner>

    )


}