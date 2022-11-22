import styled, { css } from "styled-components/native";
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize'

interface TypeProps {
    type: 'up' | 'down' | 'total';
}

export const Conteiner = styled.View<TypeProps>`
    background-color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.secondary : theme.colors.shape};
   
    width: ${RFValue(300)}px;
    border-radius: 5px;
    padding: 19px 23px;
    margin-left: 24px;
    


`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;


`;

export const Footer = styled.View`
   
    margin-top: ${RFValue(42)}px;


`;

export const Amount = styled.Text<TypeProps>`
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(40)}px;;
    color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.shape : theme.colors.dark};
    


`;

export const LastTransaction = styled.Text<TypeProps>`

    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(10)}px;
    color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.shape : theme.colors.dark};
    

`;

export const Icon = styled(Feather) <TypeProps>`
    
    font-size: ${RFValue(40)}px;

    ${(props) => props.type === 'up' && css`
        color: ${({ theme }) => theme.colors.sucess};
    ` }

    ${(props) => props.type === 'down' && css`
    color: ${({ theme }) => theme.colors.attention};
    ` }
    ${(props) => props.type === 'total' && css`
    color: ${({ theme }) => theme.colors.shape};
    ` }


`;

export const Title = styled.Text<TypeProps>`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;;
    color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.shape : theme.colors.dark};

`;