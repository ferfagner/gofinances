import styled from "styled-components/native";
import { RFValue } from 'react-native-responsive-fontsize'
import { TouchableOpacity } from 'react-native'


export const Conteiner = styled(TouchableOpacity)`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.secondary};
    align-items: center;
    border-radius: 5px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.medium};
    color: ${({ theme }) => theme.colors.shape};

    padding: 18px;

    


`;
