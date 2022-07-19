import { addProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "@/api/product";
import { Product } from "@/types/product";
import useSWR from "swr"

const useProducts = () => {
    const {data, error, mutate} = useSWR("/products");

    const create =  async (item: Product) => {
        const product = await addProduct(item);
        mutate([...data, product])
    }   

    const remove = async (id: number) => {
        await deleteProduct(id);
        const newData = data.filter((item: Product) => item.id != id);
        mutate(newData);
    }

    const getById = async (id:number) => {
        return await getProduct(id);
    }
    const getAll = async () => {
        const products =  await getAllProducts();
        mutate(data);
        return products;
    }

    const update = async (id:number, item: any) => {
        await updateProduct(id, item);
        mutate(data);
    }

    return {
        data,
        error,
        create,
        remove,
        getById,
        update
    }
}

export default useProducts;