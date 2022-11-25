import React from "react";

import {render} from '@testing-library/react-native'

import {Profile} from '../../screens/Profile'


describe('Screen Profile', ()=>{

    it('should heve placeholder correctly in user name input', ()=>{

        const { getByPlaceholderText } = render(<Profile/>);
    
        const inputName = getByPlaceholderText('Nome')
    
        expect(inputName).toBeTruthy()
    
    });
    
    it('should be loaded user data', ()=>{
        const {getByTestId} = render(<Profile/>);
    
        const getInputName = getByTestId('input-name')
        const getInputSurName = getByTestId('input-surname')
    
        expect(getInputName.props.value).toEqual('Fagner')
        expect(getInputSurName.props.value).toEqual('Fernandes')
    });
    
    it('shoud be render title correctly', ()=>{
        const {getByTestId} = render(<Profile/>);
    
        const textTitle = getByTestId('text-title')
        
        expect(textTitle.props.children).toContain('Perfil')
    });

})

