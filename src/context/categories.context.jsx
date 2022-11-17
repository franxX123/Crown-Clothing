import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";
// import SHOP_DATA from "../shop-data";
// import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    (async function getProductItems() {
      const documents = await getCategoriesAndDocuments();
      // console.log(documents);
      setCategoriesMap(documents);
    })();
  }, []);

  // useEffect(() => {
  //   // addCollectionAndDocuments("categories", SHOP_DATA);
  //   // setCurrentProducts([]);

  // }, []);

  const value = {
    categoriesMap,
  };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
