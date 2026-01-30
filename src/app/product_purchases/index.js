import { Modal } from 'react-native-paper';
import { ElectronicInvoiceModal } from '../../presentation/screens/movements';
import { MonthlyListScreen, PaymentFormScreen } from '../../presentation/screens/product_purchases';
import useProductPurchases from '../../presentation/screens/product_purchases/hooks/useListScreenProductsHook';
import { useAppSelector } from '../../state/hooks';
import { showElectronicInvoiceModal } from '../../state/slices/productPurchasesSlice';

const ProductPurchases = () => {
  const {
    listView,
    paymentView,
    selectedMonth,
    handleSelectMonth,
    handleBack,
  } = useProductPurchases();
  const defaultDocNumber = useAppSelector(s => s.productPurchases.electronicInvoiceNit);
  const isModalThreeVisibleBill = useAppSelector(
      (state) => state.productPurchases.isModalThreeVisibleBill
    );

  return (
    <>
      {listView && <MonthlyListScreen onSelectMonth={handleSelectMonth} />}
      {paymentView && <PaymentFormScreen month={selectedMonth} onBack={handleBack} />}
      <Modal
        animationType="slices"
        transparent={true}
        visible={isModalThreeVisibleBill}
        onRequestClose={() => dispatch(showElectronicInvoiceModal(false))}
      >
        <ElectronicInvoiceModal defaultDocNumber={defaultDocNumber}/>
      </Modal>
    </>
  );
};

export default ProductPurchases;

