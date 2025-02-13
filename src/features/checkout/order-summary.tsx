interface OrderSummaryProps {
  subtotal: number;
  shippingCost?: number;
}

interface SummaryLineProps {
  label: string;
  value: number;
  isTotal?: boolean;
}

const SummaryLine: React.FC<SummaryLineProps> = ({ label, value, isTotal }) => (
  <div
    className={`flex justify-between ${
      isTotal ? 'border-t border-gray-200 pt-6 text-base text-gray-900' : ''
    }`}
  >
    <dt>{label}</dt>
    <dd className='text-gray-900'>{value} kr</dd>
  </div>
);

const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  shippingCost,
}) => {
  const total = shippingCost !== undefined ? subtotal + shippingCost : subtotal;
  return (
    <dl className='mt-10 space-y-6 text-sm font-medium text-gray-500'>
      <SummaryLine label='Subtotal' value={subtotal} />
      {shippingCost !== undefined && (
        <SummaryLine label='Shipping' value={shippingCost} />
      )}
      {shippingCost !== undefined && (
        <SummaryLine label='Total' value={total} isTotal />
      )}
    </dl>
  );
};

export default OrderSummary;
