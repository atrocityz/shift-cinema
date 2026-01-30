import { use } from 'react'

import { OrderContext } from './OrderContext'

export const useOrder = () => {
  const context = use(OrderContext)

  if (!context) {
    throw new Error('useOrderContext must be used within OrderProvider')
  }

  return context
}
