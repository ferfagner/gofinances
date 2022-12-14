import styled from 'styled-components/native'

import {  RFValue } from 'react-native-responsive-fontsize'
import { Feather } from '@expo/vector-icons'

interface CategoryProps{

    isActive: boolean;


}

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};


`;

export const Header = styled.View`
    width: 100%;
    height: ${RFValue(113)}px;
    background-color: ${({ theme }) => theme.colors.primary};

    align-items: center;
    justify-content: flex-end;
    padding-bottom: 19px;


`;

export const Title = styled.Text`
     font-size: ${RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.shape};

`;

export const CategoryLabel = styled.TouchableOpacity<CategoryProps>`
    width: 100%;
    padding: ${RFValue(15)}px;
    background-color: ${({ theme, isActive }) => isActive ? theme.colors.secondary_light : theme.colors.shape };

    flex-direction: row;
    align-items: center;

   
`;

export const Icon = styled(Feather)`
    font-size: ${RFValue(18)}px;
    margin-right: 16px ;
    color: ${({ theme }) => theme.colors.dark};
   
`;

export const Name = styled.Text`

font-size: ${RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.dark};
   
`;

export const Separator = styled.View`
    width: 100%;
    height: 3px;
    color: ${({ theme }) => theme.colors.text};


   
`;


export const Footer = styled.View`
   
    width: 100%;
    padding: 24px;

   
`;

