import { Link } from 'react-router-dom';

interface EmptyCartProps {
  title?: string;
  message?: string;
  linkText?: string;
  linkTo?: string;
}

const EmptyCart: React.FC<EmptyCartProps> = ({
  title = 'Bag',
  message = 'There are no items in your bag.',
  linkText = 'Back to shopping',
  linkTo = '/',
}) => {
  return (
    <div className='text-center'>
      <h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>
        {title}
      </h1>
      <p className='mt-2 text-sm text-gray-500'>{message}</p>
      <div className='mt-6 text-sm text-gray-500'>
        <Link
          to={linkTo}
          className='font-medium text-green-500 hover:text-green-500'
        >
          {linkText}
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;
