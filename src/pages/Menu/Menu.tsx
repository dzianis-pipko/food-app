import { useEffect, useState } from 'react';
import { Headling } from '../../components/Headling/Headling'
import { Search } from '../../components/Search/Search';
import { PREFIX_URL } from '../../helpers/API';
import type { Product } from '../../interfaces/product.interface';
import styles from './Menu.module.css';
import axios, { AxiosError } from 'axios';
import { MenuList } from './MenuList/MenuList';

const Menu = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>('');

    const getMenu = async () => {
        try{
            setIsLoading(true)
            const {data} = await axios.get<Product[]>(`${PREFIX_URL}/products`);
            setProducts(data)
            setIsLoading(false)
        }catch(e){
            if(e instanceof AxiosError){
                setError(e.message);
            }
            console.error(e);
            setIsLoading(false)
            return;
        }
    }

    useEffect(() => {
        getMenu()
    }, [])

    return (
    <>
        <div className={styles.head}>
			<Headling>Меню</Headling>
			<Search placeholder='Введите блюдо или состав' />
		</div>
        <div>
            {error && error}
            {!isLoading && <MenuList products={products} />}
            {isLoading && <p>Loading...</p>}
		</div>
    </>
        
    )
}

export default Menu;