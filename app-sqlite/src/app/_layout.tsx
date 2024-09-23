import { initializeDatabase } from "@/database/initializeDatabase"
import {Slot} from "expo-router" // vai pegar as rotas de nossa pasta APP
import{SQLiteProvider} from "expo-sqlite"  // vai prover o acesso ao banco de dados de nossa aplicação
export default function Layout(){
    return(
        <SQLiteProvider databaseName="myDatabase.db" onInit={initializeDatabase}>
            {/* databaseNme ="NomeDaBaseDeDados" */}
            {/* onInit={initializeDatabase} >>> Script que vai manipular CRUD */}
            <Slot />
        </SQLiteProvider>
    )
}