import styled, {css}from "styled-components/native";
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize'
import {TouchableOpacity} from 'react-native'

interface TypeProps {
    type: 'up' | 'down' ;
}

interface ContainerProps {
    isActive: boolean ;
    type: 'up' | 'down' ;
}

export const Conteiner = styled(TouchableOpacity)<ContainerProps>`
    width: 48%;
    

    flex-direction: row;
    align-items: center;
    justify-content: center;

    border-radius: 5px;
    
    border: 1.5px solid ${({ theme, isActive }) => isActive ? theme.colors.background : theme.colors.text};
    padding: 16px;
    ${({isActive, type}) => isActive && type === 'down' && css`
    background-color: ${({ theme }) => theme.colors.attention_light};
    `}
    ${({isActive, type}) => isActive && type === 'up' && css`
    background-color: ${({ theme }) => theme.colors.sucess_light};
    `}
`;

export const Title = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.dark};
    

`;

export const Icon = styled(Feather)<TypeProps>`
    color: ${({ theme, type }) => type === 'up' ? theme.colors.sucess: theme.colors.attention};
    font-size: ${RFValue(24)}px;
    margin-right: 12px;


`;