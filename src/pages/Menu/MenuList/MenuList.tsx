import { ProductCard } from '../../../components/ProductCard/ProductCard'
import type { MenuListProps } from './MenuList.props'
import styles from './MenuList.module.css'

export const MenuList = ({products}:MenuListProps ) => {
    return <div className={styles.wrapper}>{products.map((p) => (
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
    )}</div>
}