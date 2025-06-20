import { useLoaderData } from 'react-router-dom'
import type { Product as ProductProps } from '../../interfaces/product.interface';

export const Product = () => {
    const data = useLoaderData() as ProductProps;

    return <div>Product - {data.name}</div>
}