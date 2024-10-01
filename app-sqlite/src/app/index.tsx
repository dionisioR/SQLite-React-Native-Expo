import { useEffect, useState } from 'react'
import { View, Text, Button, Alert, FlatList } from 'react-native'
import {router } from "expo-router"

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

            Alert.alert("Produto cadastrado com o ID: " + response.insertedRowId)
        } catch (error) {
            console.log(error);
        }
    }

    async function update() {
        try {
            if (isNaN(Number(quantity))) {
                return Alert.alert("Quantidade", "A quantidade precisa ser um número!")
            }
            const response = await productDatabase.update({ id:Number(id), name, quantity: Number(quantity) })

            Alert.alert("Produto atualizado")
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

    async function remove(id: number){
        try {
            await productDatabase.remove(id)
            await list()
        } catch (error) {
            console.log(error);
        }
    }

    function details(item:ProductDatabase) {
        setId(String(item.id))
        setName(item.name)
        setQuantity(String(item.quantity)) 
    }

    async function handleSave(){
        if(id){
            update()
        }else{
            create()
        }
        setId('')
        setName('')
        setQuantity('')
        await list()
    }

    useEffect(() => {
        list()
    }, [search])

    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 32, gap: 16 }}>

            <Input placeholder='Nome' onChangeText={setName} value={name} />
            <Input placeholder='Quantidade' onChangeText={setQuantity} value={quantity} />
            <Button title='Salvar' onPress={handleSave} />

            <Input placeholder='Pesquisar por nome' onChangeText={setSearch} value={search} />
            <FlatList
                data={product}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <Product data={item} onPress={() => details(item)} onDelete={() => remove(item.id)} onOpen={() => router.navigate("/details/" + item.id)} />}
                contentContainerStyle={{gap: 16}}
            />
        </View>
    )
}