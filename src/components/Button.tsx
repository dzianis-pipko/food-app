import styles from './Button.module.css'
import type { ButtonProps } from './Button.props';
import cn from 'classnames';

const Button = ({children, className, ...props}: ButtonProps) => {
    return (
        <button {...props} className={cn(styles.button, styles.accent, className)}>{children}</button>
    )
}

export default Button;