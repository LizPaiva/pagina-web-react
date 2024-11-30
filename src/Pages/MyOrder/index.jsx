import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context';
import Layout from '../../Components/Layout';
import OrderCard from '../../Components/OrderCard';

function MyOrder() {
  const context = useContext(ShoppingCartContext);
  const currentPath = window.location.pathname;
  
  // Obtén el índice a partir de la URL, o usa 'last' para el último pedido
  let index = currentPath.substring(currentPath.lastIndexOf('/') + 1);
  if (index === 'last') index = context.order?.length - 1;

  // Asegúrate de que el índice sea un número válido y dentro del rango de orders
  const validIndex = Number(index);
  const currentOrder = context.order?.[validIndex] || context.order?.[context.order?.length - 1];

  return (
    <Layout>
      <div className='flex items-center justify-center relative w-80 mb-6'>
        <Link to='/my-orders' className='absolute left-0'>
          <ChevronLeftIcon className='h-6 w-6 text-black cursor-pointer' />
        </Link>
        <h1>My Order</h1>
      </div>

      <div className="flex flex-col w-80">
        {currentOrder && currentOrder.products?.length > 0 ? (
          currentOrder.products.map(product => (
            <OrderCard
              key={product.id}
              id={product.id}
              title={product.title}
              imageUrl={product.images}
              price={product.price}
            />
          ))
        ) : (
          <p className='items-center'>No hay productos en el pedido.</p>
        )}
      </div>
    </Layout>
  );
}

export default MyOrder;