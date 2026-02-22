import { useOrder } from '../../-contexts/order'

export const PaymentStep = () => {
  const orderContext = useOrder()

  console.log(orderContext)

  return <div className="flex flex-1 flex-col gap-6">PaymentStep</div>
}
