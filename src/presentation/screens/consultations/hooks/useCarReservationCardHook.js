const useProductsByPlate = (products = {}) => {
  const sections = [];

  if (products.gopass) {
    sections.push({
      type: "gopass",
      title: "Planes GoPass",
      items: [products.gopass],
    });
  }

  if (products.ruedaz) {
    sections.push({
      type: "ruedaz",
      title: "Suscripciones Ruedaz",
      items: [products.ruedaz],
    });
  }

  if (products.monthly) {
    sections.push({
      type: "monthly",
      title: "Mensualidades",
      items: [products.monthly],
    });
  }

  if (products.others?.length) {
    sections.push({
      type: "others",
      title: "Otros Servicios",
      items: products.others,
    });
  }

  return sections;
};

export default useProductsByPlate;
