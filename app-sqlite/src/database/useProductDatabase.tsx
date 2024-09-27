import { useSQLiteContext } from "expo-sqlite"

export type ProductDatabase = {
    id: number
    name: string
    quantity: number
}

export function useProductDatabase() {
    const database = useSQLiteContext() // permite manipular a base de dados que está sendo comparitlhado no arquivo index

    async function create(data: Omit<ProductDatabase, "id">) {
        const statement = await database.prepareAsync(
            'INSERT INTO products (name, quantity) VALUES ($name, $quantity)'
        )
        try {
            const result = await statement.executeAsync({
                $name: data.name,
                $quantity: data.quantity,
            })
            // pegando o útimo id inserido
            const insertedRowId = result.lastInsertRowId.toLocaleString()
            return { insertedRowId }
        } catch (error) {
            throw error
        }finally {
            await statement.finalizeAsync()
        }
    }

    async function searchByName(name: string){
        try{
            const query = "SELECT * FROM products WHERE name LIKE ?"
            const response = await database.getAllAsync<ProductDatabase>(query, `%${name}%`)
            return response
        }catch(error){
            throw error
        }
    }
    return {
        create,
        searchByName,
    }
}