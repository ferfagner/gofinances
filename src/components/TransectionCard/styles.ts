import styled from 'styled-components/native'
import { Feather } from '@expo/vector-icons';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize'

interface TypeTransecsions {
    type: 'up' | 'down' ;
}

export const Conteiner = styled.View`
    background-color: ${({ theme }) => theme.colors.shape};
    border-radius: 5px;
    padding: 17px 24px;
    margin-bottom: ${RFValue(16)}px;
    


`;

export const Title = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.regular};;


`;

export const Amount = styled.Text<TypeTransecsions>`
    font-size: ${RFValue(22)}px;
    margin-top: 2px;
    font-family: ${({ theme }) => theme.fonts.regular};;
    color: ${({ theme, type }) => type === 'up' ? theme.colors.sucess : theme.colors.attention};

`;

export const Icon = styled(Feather)`
    font-size: ${RFValue(20)}px;
    color: ${({ theme }) => theme.colors.text};


`;

export const CategoryName = styled.Text`
    margin-left: 17px;
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.regular};;


`;

export const Date = styled.Text`
    font-size: ${RFValue(12)}px;
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.regular};;


`;

export const Footer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    margin-top: 19px;

`;


export const Category = styled.View`
     flex-direction: row;
     align-items: center;

`;


   