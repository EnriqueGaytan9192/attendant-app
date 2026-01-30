import { useState, useEffect } from "react";

const useSolicitudesHook = (data, defaultItemsPerPage = 5) => {
  const [page, setPage] = useState(0);
  const numberOfItemsPerPageList = [5, 10, 15];
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);

  useEffect(() => {
    setPage(0);
  }, [data]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, data.length);

  return {
    page,
    setPage,
    itemsPerPage,
    setItemsPerPage,
    numberOfItemsPerPageList,
    from,
    to,
  };
};

export default useSolicitudesHook;