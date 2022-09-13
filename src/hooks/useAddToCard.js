const useAddToCard = () => {
  // set item in localStorage
  function setItemInLocalStorage(data) {
    localStorage.setItem("aruot", JSON.stringify({ products: data }));
  }

  // Get item in localStorage
  function getItemsInLocalStorage() {
    const items = localStorage.getItem("aruot");
    const parseItems = JSON.parse(items);
    const products = parseItems?.products;

    return products;
  }

  // Store data in localStorage
  const storeDataInLocalStorage = (data) => {
    const storedData = getItemsInLocalStorage();

    if (storedData) {
      const productId = data?.productId;

      //   Find the product if the product is available
      const isExist = storedData?.find(
        (product) => product?.productId === productId
      );

      if (isExist) {
        const rest = storedData?.filter(
          (product) => product?.productId !== productId
        );
        const newData = [...rest, data];

        setItemInLocalStorage(newData);
      } else {
        setItemInLocalStorage([...storedData, data]);
      }
    } else {
      setItemInLocalStorage([data]);
    }
  };

  //   Delete LocalStorage item
  function deleteLocalStorageItem(id) {
    const storedItems = getItemsInLocalStorage();
    const rest = storedItems?.filter((item) => item?.productId !== id);
    
    // Store data
    setItemInLocalStorage(rest);
  }

  return {
    storeDataInLocalStorage,
    getItemsInLocalStorage,
    deleteLocalStorageItem,
  };
};

export default useAddToCard;
