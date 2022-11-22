import React, { useState } from "react";

import uuid from 'react-native-uuid'

import { useForm } from 'react-hook-form'
import {useNavigation} from '@react-navigation/native'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button } from "../../components/Forms/Button";
import { CategoryButton } from "../../components/Forms/CategoryButton";
import { InputForm } from '../../components/Forms/InputForm'
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from 'react-native'
import { TransacsionTypeButton } from "../../components/Forms/TransacsionTypeButton";

import {useAuth} from "../../hooks/auth"

import { CategorySelect } from '../CategorySelect';

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsTypes

} from './styles'

type NavigationProps = {
    navigate:(screen:string) => void;
 }

interface formData {

    [name: string]: string;

}

const schema = Yup.object().shape({

    name: Yup
        .string()
        .required('Nome é Obrigatorio!'),
    amount: Yup
        .number()
        .required('Preço é Obrigatorio!')
        .positive('O Valor não pode ser Negativo!')

})

export function Register() {
    const {user} = useAuth();
    const dataKey = `@gofinance:transecsions_user:${user.id}`;
    const [transectionType, setTransectiontype] = useState('')
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria'
    })
  

    const navigation = useNavigation<NavigationProps>();

    const [categoryModalOpen, setcategoryModalOpen] = useState(false);
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors }

    } = useForm({ resolver: yupResolver(schema) });
    function handletransectionTypeSelect(type: 'up' | 'down') {

        setTransectiontype(type)

    }

    function handleopenSelectionCategory() {

        setcategoryModalOpen(true);

    }

    function handlecloseSelectionCategory() {

        setcategoryModalOpen(false);

    }

    async function handleRegister(form: formData) {

        if (!transectionType)
            return Alert.alert('Selecione o Tipo da Transação')

        if (category.key === 'category')
            return Alert.alert('Selecione a Categoria')



        const newTransaction = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            type: transectionType,
            category: category.key,
            date: new Date()


        }

        try {
            const data = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data) : [];

            const dataFormated = [
                ...currentData,
                newTransaction

            ]

            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormated));

            setTransectiontype('');
            setCategory({
                key: 'category',
                name: 'Categoria'
            });
            reset();

            navigation.navigate('Listagem');

        } catch (error) {
            console.log(error);
            Alert.alert("Não foi possivel salvar!")
        }


    }

   

    return (
        <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
        >
            <Container>

                <Header>
                    <Title>Cadastro</Title>
                </Header>
                <Form>
                    <Fields>
                        <InputForm
                            name="name"
                            control={control}
                            placeholder="Nome"
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                        />
                        <InputForm
                            name="amount"
                            control={control}
                            placeholder="preço"
                            keyboardType="numeric"
                            error={errors.amount && errors.amount.message}
                        />
                        <TransactionsTypes>
                            <TransacsionTypeButton
                                type="up"
                                title="Entrada"
                                onPress={() => handletransectionTypeSelect('up')}
                                isActive={transectionType === 'up'}
                            />
                            <TransacsionTypeButton
                                type="down"
                                title="Saida"
                                onPress={() => handletransectionTypeSelect('down')}
                                isActive={transectionType === 'down'}
                            />
                        </TransactionsTypes>
                        <CategoryButton
                            title={category.name}
                            onPress={handleopenSelectionCategory}
                        />
                    </Fields>
                    <Button
                        title="Enviar"
                        onPress={handleSubmit(handleRegister)}
                    />

                </Form>

                <Modal visible={categoryModalOpen}>
                    <CategorySelect
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handlecloseSelectionCategory}

                    />
                </Modal>

            </Container>
        </TouchableWithoutFeedback>
    )

}