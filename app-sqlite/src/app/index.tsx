import { useState } from 'react'
import {View, Text, Button} from 'react-native'

import { Input } from './components/Input'
import {useProductDatabase} from "@/database/useProductDatabase"

export default function Index(){
    
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [product, setProduct] = useState([])

    const productDatabase = useProductDatabase()

    function create(){
        productDatabase.create()
    }

    return(
        <View style={{flex:1, justifyContent:'center', padding:32, gap:16}}>
            
            <Input placeholder='Nome' />
            <Input placeholder='Quantidade' />
            <Button title='Salvar' onPress={create} />
        </View>
    )
}