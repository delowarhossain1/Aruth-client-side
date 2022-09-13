
const useAddToCard = () => {
    // set item in localStorage
    function setItemInLocalStorage (data) {
        localStorage.setItem("aruot", JSON.stringify({ products: data }));
    }

    // Get item in localStorage
    function getItemsInLocalStorage (){
        const items = localStorage.getItem('aruot');
        const parseItems = JSON.parse(items);
        return parseItems
    }

  // Store data in localStorage
  const storeDataInLocalStorage = (data) => {

    const storedData = getItemsInLocalStorage();

    if (storedData?.products) {
      const storedProduct = storedData?.products;
      const productId = data?.productId;

    //   Find the product if the product is available
      const isExist = storedProduct?.find(
        (product) => product?.productId === productId
      );

      if (isExist) {
        const rest = storedProduct?.filter(product => product?.productId !== productId);
        const newData = [...rest, data];

        setItemInLocalStorage(newData);
      } else {
        setItemInLocalStorage([...storedData, data]);
      }

    } 
    else {
        setItemInLocalStorage([data]);
    }
  };



  return { storeDataInLocalStorage };
};

export default useAddToCard;
