import { useEffect, useState } from 'react';
import { useAppSelector } from '../../state/hooks';
export const useFetch = (path, method, opt) => {
  //const baseURL = "https://24s14u1qdj.execute-api.us-east-1.amazonaws.com"; //Producción
  //const baseURL = "https://attendant-back-qa.parking.net.co" //QA
  const baseURL = "https://kzifflgdih.execute-api.us-east-1.amazonaws.com" //Desarrollo

  //const baseURL = "https://allowed-wallaby-keen.ngrok-free.app"
  const { onComplete, onError, onloading } = opt;
  const token = useAppSelector((state) => state.auth.token);
 
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorFetch, setErrorFetch] = useState(null);
  const [pathreRetch, setPathreRetch] = useState(null);
  const [hasFetched, setHasFetched] = useState(false); // Nuevo estado para indicar si ya se ha realizado la petición
 
  useEffect(() => {
    setErrorFetch(null);
    if (path && !hasFetched) {
      // Verificar que aún no se ha hecho la petición
      setPathreRetch(path);
      const exec = async () => await getDataFetch();
      exec();
    }
    // eslint-disable-next-line
  }, [path, hasFetched]);
 
  useEffect(() => {
    if (data && onComplete) {
      onComplete(data);
    }
    // eslint-disable-next-line
  }, [data]);
 
  useEffect(() => {
    if (onloading) {
      onloading(loading);
    }
    // eslint-disable-next-line
  }, [loading]);
 
  useEffect(() => {
    if (errorFetch && onError && !hasFetched) {
      onError(errorFetch);
    }
  }, [errorFetch, onError, hasFetched]);
 
  const getDataFetch = async () => {
    try {
      const rs = await invoke();
      if (rs.ok) {
        const rsJson = await rs.json();
        setData(rsJson);
        setHasFetched(true); // Actualizar el estado indicando que se ha realizado la petición
      } else {
        const rsJson = await rs.json();
        setErrorFetch(rsJson);
      }
    } catch (e) {
      const exObj = errorManager(e);
      setErrorFetch(exObj);
    } finally {
      setLoading(false);
    }
  };
 
  const invoke = async (newPath) => {
    setLoading(true);
    const pathFetch = newPath ? newPath : path;
    const rs = await fetch(`${baseURL}${pathFetch}`, {
      method,
      body: opt.rq && JSON.stringify(opt.rq),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    return rs;
  };
 
  const refetch = async () => {
    let data;
    let error;
    try {
      console.log('refetch', pathreRetch);
      const rs = await invoke(pathreRetch);
      if (rs.ok) {
        const rsJson = await rs.json();
        setData(rsJson);
        data = rsJson;
      } else {
        const rsJson = await rs.json();
        setErrorFetch(rsJson);
        error = rsJson;
      }
    } catch (e) {
      const exObj = errorManager(e);
      error = exObj;
      setErrorFetch(exObj);
    } finally {
      setLoading(false);
    }
    return { data, error };
  };
 
  return { data, loading, errorFetch, refetch, reloadByFlag: setHasFetched };
};
 
export const useLazyFetch = () => {
  //const baseURL = "https://24s14u1qdj.execute-api.us-east-1.amazonaws.com"; //Producción
  //const baseURL = "https://attendant-back-qa.parking.net.co" //QA
  const baseURL = "https://kzifflgdih.execute-api.us-east-1.amazonaws.com" //Desarrollo

  //const baseURL = "https://allowed-wallaby-keen.ngrok-free.app"
  const token = useAppSelector((state) => state.auth.token);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorFetch, setErrorFetch] = useState(null);

  const getDataFetch = async (path, method, opt) => {
    let dataResp = null;
    let error = null;
    let loadingResp = null;

    try {
      const rs = await invoke(path, method, opt);

      // Manejo de error
      if (!rs.ok) {
        const rsJson = await rs.json();
        setErrorFetch(rsJson);
        error = rsJson;
      }

      // Manejo de éxito
      if (rs.ok) {
        // Asumiendo que tu backend siempre responde con JSON
        const rsJson = await rs.json();
        setData(rsJson);
        dataResp = rsJson;
      }
    } catch (e) {
      const exObj = errorManager(e);
      error = exObj;
      setErrorFetch(exObj);
    } finally {
      setLoading(false);
      loadingResp = false;
    }

    return {
      data: dataResp,
      errorFetch: error,
      loading: loadingResp,
    };
  };

  // Aquí diferenciamos: si method === 'FILES', enviamos FormData
  // de lo contrario, enviamos JSON
  const invoke = async (path, method, opt) => {
    setLoading(true);

    let fetchOptions;
    if (method === 'FILES') {
      // Suponemos que opt.rq es tu FormData
      fetchOptions = {
        method: 'POST', // o el método que necesites
        body: opt.rq,
        mode: 'cors',
        headers: {
          // No pongas 'Content-Type': 'application/json'
          ...(token && { Authorization: `Bearer ${token}` }),
          ...(opt &&
            opt.tokenTmp &&
            !token && { Authorization: `Bearer ${opt.tokenTmp}` }),
        },
      };
    } else {
      // Caso normal: JSON
      fetchOptions = {
        method,
        body: opt && opt.rq && JSON.stringify(opt.rq),
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
          ...(opt &&
            opt.tokenTmp &&
            !token && { Authorization: `Bearer ${opt.tokenTmp}` }),
        },
      };
    }
    console.log('Body del request:', fetchOptions.body);
    const rs = await fetch(`${baseURL}${path}`, fetchOptions);
    return rs;
  };

  return { data, loading, errorFetch, getDataFetch };
};
 
export const useLazyFileFetch = () => {

  //const baseURL = "https://24s14u1qdj.execute-api.us-east-1.amazonaws.com"; //Producción
  //const baseURL = "https://attendant-back-qa.parking.net.co" //QA
  const baseURL = "https://kzifflgdih.execute-api.us-east-1.amazonaws.com" //Desarrollo

  //const baseURL = "https://allowed-wallaby-keen.ngrok-free.app"
  const token = useAppSelector((state) => state.auth.token);

  const [loading, setLoading] = useState(false);
  const [errorFetch, setErrorFetch] = useState(null);

  const getDataFileFetch = async (path, method, opt) => {
    setLoading(true);
    setErrorFetch(null);

    try {
      const response = await fetch(`${baseURL}${path}`, {
        method,
        body: opt?.rq ? JSON.stringify(opt.rq) : null,
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
          ...(opt?.tokenTmp && !token && { Authorization: `Bearer ${opt.tokenTmp}` }),
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorFetch(errorData.error?._errorCode || "Unknown error");
        return { errorFetch, loading: false };
      }

      // Descarga del archivo
      const blob = await response.blob();
      const fileUrl = URL.createObjectURL(blob);

      // Crear enlace de descarga
      const a = document.createElement("a");
      a.href = fileUrl;
      a.download = opt?.fileName || "file.pdf";
      document.body.appendChild(a);
      a.click();

      // Limpiar el DOM después de descargar
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(fileUrl);
      }, 0);

      return { errorFetch: null, loading: false };
    } catch (error) {
      setErrorFetch("Error en la descarga del archivo");
      return { errorFetch: "Error en la descarga del archivo", loading: false };
    } finally {
      setLoading(false);
    }
  };

  return { loading, errorFetch, getDataFileFetch };
};
 
const errorManager = (error) => {
  const { message } = error;
  switch (message) {
    case 'Failed to fetch':
      return {
        timestamp: new Date().toISOString(),
        status: 503,
        error: 'failed-fetch',
        errorArgs: null,
        errors: null,
      };
    default:
      return {
        timestamp: new Date().toISOString(),
        status: 503,
        error: 'unexpected-error',
        errorArgs: null,
        errors: null,
      };
  }
};