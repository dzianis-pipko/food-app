import type { SearchProps } from './Search.props'
import cn from 'classnames';
import styles from './Search.module.css';
import { forwardRef } from 'react';

export const Search = forwardRef<HTMLInputElement, SearchProps>(({isValid = true, className, ...props}, ref) => {
    return (
        <div ref={ref} className={styles['input-wrapper']}>
            <input className={cn(styles.input, className, {
                [styles['invalid']]: isValid
            })} {...props} />
            <img className={styles['icon']} src='/search-icon.svg' alt='Иконка лупы' />
        </div>
    )
    
})