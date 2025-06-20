import { ProductCard } from '../../../components/ProductCard/ProductCard'
import type { MenuListProps } from './MenuList.props'

export const MenuList = ({products}:MenuListProps ) => {
    return products.map((p) => {
        return (
            <ProductCard
                key={p.id}
                id={p.id}
                name={p.name}
                description={p.ingredients.join(', ')}
                image={p.image}
                price={p.price}
                rating={p.rating}
            />
        )
    })
}