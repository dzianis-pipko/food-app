import type { HeadlingProps } from './Headling.props'
import cn from 'classnames';
import styles from './Headling.module.css';

export const Headling = ({children, className, ...props}: HeadlingProps) => {
    return <h1 className={cn(className, styles.h1)} {...props}>{children}</h1>
}