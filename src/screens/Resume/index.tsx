import React, { useState, useCallback } from "react";
import { HistoryCards } from "../../components/HistoryCards";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { categories } from "../../utils/categories";
import { VictoryPie } from 'victory-native'
import { useFocusEffect } from '@react-navigation/native'
import { RFValue } from "react-native-responsive-fontsize";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { addMonths, subMonths, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ActivityIndicator } from 'react-native'

import {
    Container,
    Header,
    Title,
    Content,
    ChartContainer,
    MonthSelect,
    MonthSelectButton,
    SelectIcon,
    Month,
    LoadContainer

} from './styles'
import { useAuth } from "../../hooks/auth";

interface ExpensiveProps {

    type: 'up' | 'down',
    name: string,
    amount: string,
    date: string,
    category: string

}

interface CategoryData {
    key: string,
    name: string,
    total: number,
    totalFormatted: string,
    color: string
    percent: string

}

export function Resume() {
    const {user} = useAuth()
    const [selectedDate, setSelectedDate] = useState(new Date());

    const [isLoading, setIsLoading] = useState(false);

    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

    const dataKey = `@gofinance:transecsions_user:${user.id}`

    function handleChangeDate(action: 'next' | 'prev') {
        
        if (action === 'next') {
            setSelectedDate(addMonths(selectedDate, 1))
        } else {
            setSelectedDate(subMonths(selectedDate, 1))
        }
    }

    async function loadData() {
        setIsLoading(true)
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : []

        const expensives = responseFormatted
            .filter((expensive: ExpensiveProps) => 
            expensive.type === 'down' &&
            new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
            new Date(expensive.date).getFullYear() === selectedDate.getFullYear() 
            )

        const expensivesTotal = expensives.reduce(
            (acc: number, expensive: ExpensiveProps) => {
                return acc + Number(expensive.amount)

            }, 0)

        const totalByCategory: CategoryData[] = []

        categories.forEach(category => {
            let categorySum = 0;

            expensives.forEach((expensive: ExpensiveProps) => {
                if (expensive.category === category.key) {
                    categorySum += Number(expensive.amount)
                }

            });

            if (categorySum > 0) {

                const percent = `${((categorySum / expensivesTotal) * 100).toFixed(0)}%`

                totalByCategory.push({
                    name: category.name,
                    totalFormatted: categorySum.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }),
                    color: category.color,
                    key: category.key,
                    total: categorySum,
                    percent,

                })
            }

        })

        setTotalByCategories(totalByCategory)
        setIsLoading(false)
    }

    useFocusEffect(useCallback(() => {
        loadData()

    }, [selectedDate]));

    return (
        <Container>
           

           
            <Header>
                <Title>Resumo por Categoria</Title>
            </Header>
            {
                 isLoading ?
                 <LoadContainer><ActivityIndicator
                     color="red"
                     size="large"
                 /></LoadContainer> : 
            <Content
                showsHoriontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingBottom: useBottomTabBarHeight(),
                    flex: 1

                }}
            >

                <MonthSelect>
                    <MonthSelectButton 
                    onPress={() => handleChangeDate('prev')}
                    >
                    <SelectIcon name="chevron-left" />
                    </MonthSelectButton>
                    <Month>{format(selectedDate, 'MMMM, yyyy', {locale: ptBR})}</Month>
                    <MonthSelectButton 
                    onPress={() => handleChangeDate('next')}
                    >
                    <SelectIcon name="chevron-right" />
                    </MonthSelectButton>
                </MonthSelect>


                <ChartContainer>

                    <VictoryPie
                        data={totalByCategories}
                        colorScale={totalByCategories
                            .map(category => category.color)}
                        style={{
                            labels: {
                                fontSize: RFValue(18),
                                fontWeight: 'bold',
                                fill: 'white'

                            }
                        }}
                        labelRadius={80}
                        x="percent"
                        y="total"

                    />
                </ChartContainer>
                {
                    totalByCategories.map(item => (
                        <HistoryCards
                            key={item.key}
                            title={item.name}
                            color={item.color}
                            amount={item.totalFormatted}
                        />

                    ))

                }
            </Content>
            
        }
        </Container >

    )


}