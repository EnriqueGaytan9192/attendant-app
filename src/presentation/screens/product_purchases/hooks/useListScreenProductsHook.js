import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { goToPayment, backToList } from '../../../../state/slices/productPurchasesSlice';
import { useAppSelector } from '../../../../state/hooks';

const useProductPurchases = () => {
  const dispatch = useDispatch();
  const { listView, paymentView, selectedMonth } = useSelector(state => state.productPurchases);
  const { parqueaderoId, token } = useAppSelector(state => state.auth);

  const [mensualidades, setMensualidades] = useState([]);
  const [loadingMensualidades, setLoadingMensualidades] = useState(false);
  const [errorMensualidades, setErrorMensualidades] = useState(null);

  useEffect(() => {
    if (!parqueaderoId) return;

    const fetchMensualidades = async () => {
      setLoadingMensualidades(true);
      setErrorMensualidades(null);

      try {
        const response = await fetch(
          `https://inside-back-dev.parking.net.co/mensualidades?page=1&pageSize=10&active=true&parqueaderoId=${parqueaderoId}&conCupos=true&tipoMensualidadId=1`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error en la petición: ${response.statusText}`);
        }

        const data = await response.json();

        // 👇 Aquí se imprime la respuesta de la API en la consola
        console.log('Respuesta de la API mensualidades:', data);

        setMensualidades(data.data || []);
      } catch (error) {
        setErrorMensualidades(error);
      } finally {
        setLoadingMensualidades(false);
      }
    };

    fetchMensualidades();
  }, [parqueaderoId, token]);

  const handleSelectMonth = (month) => {
    dispatch(goToPayment(month));
  };

  const handleBack = () => {
    dispatch(backToList());
  };

  return {
    listView,
    paymentView,
    selectedMonth,
    mensualidades,
    loadingMensualidades,
    errorMensualidades,
    handleSelectMonth,
    handleBack,
  };
};

export default useProductPurchases;
