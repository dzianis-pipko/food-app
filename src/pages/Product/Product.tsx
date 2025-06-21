import { Await, useLoaderData } from 'react-router-dom'
import type { Product as ProductProps } from '../../interfaces/product.interface';
import { Suspense } from 'react';

export const Product = () => {
    const data = useLoaderData() as ProductProps;

    return(
        <>
            <Suspense fallback={'Загружаю...'}>
                <Await resolve={data} >
                    {(resolvedData: ProductProps) => (
                        <div>Product - {resolvedData.name}</div>
                    )}
                </Await>
            </Suspense>
        </>
    )
}