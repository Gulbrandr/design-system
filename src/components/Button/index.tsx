import { FC } from 'react';

type ButtonProps = {
  variant:
    | 'primary'
    | 'secondary'
    | 'tertiary-gray'
    | 'tertiary-primary'
    | 'link';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const BaseButton = ({ children, ...props }: Omit<ButtonProps, 'variant'>) => {
  return (
    <button className="btn-primary" {...props}>
      {children}
    </button>
  );
};

const BaseButtonTeritary = ({
  children,
  ...props
}: Omit<ButtonProps, 'variant'>) => {
  return (
    <button
      className="flex items-center gap-2 px-1 py-2 text-center border rounded-lg hover:shadow-lg bg-gray-50 border-primary-500 text-dark-400 text-body-3"
      {...props}
    >
      {children}
    </button>
  );
};

const BaseButtonLink = ({
  children,
  ...props
}: Omit<ButtonProps, 'variant'>) => {
  return (
    <button
      className="px-6 py-4 text-center bg-transparent border border-transparent rounded-lg hover:shadow-lg text-primary-500 text-body-2"
      {...props}
    >
      {children}
    </button>
  );
};

/**
 * Primary UI component for user interaction
 */
export const Button: FC<ButtonProps> = ({
  variant,
  type = 'button',
  children,
  ...props
}) => {
  return (
    <>
      {variant === 'primary' && (
        <button type={type} className="btn-primary" {...props}>
          {children}
        </button>
      )}
      {variant === 'secondary' && (
        <BaseButton {...props}>{children}</BaseButton>
      )}
      {variant === 'tertiary-gray' && (
        <BaseButtonTeritary {...props}>{children}</BaseButtonTeritary>
      )}
      {variant === 'tertiary-primary' && (
        <BaseButtonTeritary {...props}>{children}</BaseButtonTeritary>
      )}
      {variant === 'link' && (
        <BaseButtonTeritary {...props}>{children}</BaseButtonTeritary>
      )}
    </>
  );
};
export default Button;
