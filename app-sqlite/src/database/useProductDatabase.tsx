export type productDatabase = {
    id:number
    name:string
    quantity:number
}

export function useProductDatabase(){

    async function  create(data: Omit<productDatabase, "id">) {
        try {

        }catch(error){

        }
    }

    return{
        create,
    }
}