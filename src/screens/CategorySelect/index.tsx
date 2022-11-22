import React from "react";
import { FlatList } from "react-native";
import { Button } from "../../components/Forms/Button";
import { categories } from "../../utils/categories";


import {Container, Header, Title, CategoryLabel, Icon, Name, Separator, Footer} from './styles'

interface Category{

    key: string;
    name: string;

}

interface Props {

    category: Category;
    setCategory:(category: Category) => void;
    closeSelectCategory: () => void;

}

export function CategorySelect({
    setCategory,
    category,
    closeSelectCategory}
    : Props){

        function handleCategorySelect(item: Category){
            
            setCategory(item)
        }

    return(
        <Container>
            <Header>
                <Title>Categoria</Title>
            </Header>
            <FlatList 
            data={categories}
            style={{flex: 1, width:'100%'}}
            keyExtractor={(item) => item.key}
            renderItem={({item}) => (
                <CategoryLabel
                onPress={() => handleCategorySelect(item)}
                isActive={category.key === item.key}
                >
                    <Icon name={item.icon}/>
                    <Name>{item.name}</Name>
                </CategoryLabel>

            )}
            ItemSeparatorComponent={Separator}
            />
            <Footer>
                <Button 
                onPress={closeSelectCategory}
                title="Selecionar"/>
            </Footer>
        </Container>


    )


}