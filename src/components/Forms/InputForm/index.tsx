import React from "react";
import { Input } from "../Input";
import { TextInputProps } from 'react-native'

import { Conteiner, Error } from './styles'
import { Control, Controller } from "react-hook-form";

interface Porps extends TextInputProps {
    control: Control;
    name: string;
    error: any;


}

export function InputForm({ control, name, error, ...rest }: Porps) {

    return (

        <Conteiner>
            <Controller
                control={control}
                render={({field: {onChange, value}}) => (


                    <Input
                    onChangeText={onChange}
                    value={value}
                    {...rest}
                />

                )}
                name={name}
            />
              {error && <Error>{error} </Error>}
           
        </Conteiner>

    )

}