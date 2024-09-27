import { useEffect, useState } from 'react'
import { View, Text, Button, Alert, FlatList } from 'react-native'

import { Input } from './components/Input'
import { Product } from './components/Product'

import { useProductDatabase, ProductDatabase } from "@/database/useProductDatabase"

export default function Index() {

    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [search, setSearch] = useState('')
    const [quantity, setQuantity] = useState('')
    const [product, setProduct] = useState<ProductDatabase[]>([])

    const productDatabase = useProductDatabase()

    async function create() {
        try {
            if (isNaN(Number(quantity))) {
                return Alert.alert("Quantidade", "A quantidade precisa ser um número!")
            }
            const response = await productDatabase.create({ name, quantity: Number(quantity) })

            list()

            Alert.alert("Produto cadastrado com o ID: " + response.insertedRowId)
        } catch (error) {
            console.log(error);
        }
    }

    async function list() {
        try {
            const response = await productDatabase.searchByName(search)
            setProduct(response)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        list()
    }, [search])

    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 32, gap: 16 }}>

            <Input placeholder='Nome' onChangeText={setName} value={name} />
            <Input placeholder='Quantidade' onChangeText={setQuantity} value={quantity} />
            <Button title='Salvar' onPress={create} />

            <Input placeholder='Pesquisar por nome' onChangeText={setSearch} value={search} />
            <FlatList
                data={product}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <Product data={item}
                />}
                contentContainerStyle={{gap: 16}}
            />
        </View>
    )
}