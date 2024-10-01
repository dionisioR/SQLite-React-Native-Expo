import { Pressable, PressableProps, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"

type Props = PressableProps & {
    data: {
        name: string
        quantity: number
    }
    onDelete: () => void // função para deletar um produto  
    onOpen: () => void // 
}

export function Product({ data, onDelete, onOpen, ...rest }: Props) {
    return (
        <Pressable {...rest} style={{ backgroundColor: "#cecece", padding: 24, borderRadius: 5, gap: 12, flexDirection: 'row' }}>
            <Text style={{ flex: 1 }}>{data.quantity} - {data.name}</Text>
            <TouchableOpacity onPress={onDelete}>
                <MaterialIcons name="delete" color="red" size={24} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onOpen}>
                <MaterialIcons name="visibility" color="blue" size={24} />
            </TouchableOpacity>
        </Pressable>
    )
}