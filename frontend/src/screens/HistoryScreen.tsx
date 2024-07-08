import React from 'react'
import { History } from '../features/user/components/History'
import { ICart } from '../features/cart/cart.type';

const item: ICart[] = [
    {
      id: 1,
      ownerId: 1,
      quantity: 1,
      product: {
        id: 1,
        name: "Product 1",
        image_url: "https://via.placeholder.com/150",
        point_cost: 100,
        description: "Product 1 description",
        quantity: 2,
      },
    },
    {
      id: 2,
      ownerId: 1,
      quantity: 2,
      product: {
        id: 2,
        name: "Product 2",
        image_url: "https://via.placeholder.com/150",
        point_cost: 200,
        description: "Product 2 description",
        quantity: 2,
      },
    },
    {
      id: 3,
      ownerId: 1,
      quantity: 3,
      product: {
        id: 3,
        name: "Product 3",
        image_url: "https://via.placeholder.com/150",
        point_cost: 300,
        description: "Product 3 description",
        quantity: 2,
      },
    },
  ];

export const HistoryScreen = () => {
  return (
    <div className="CartScreen">
      {item.map((item, idx) => {
        return <History cart={item} key={idx} />;
      })}
    </div>
  )
}
