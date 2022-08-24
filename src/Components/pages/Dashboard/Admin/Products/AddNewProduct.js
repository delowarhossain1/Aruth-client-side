import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./../../../../../firebase.init";
import useAlert from "./../../../../../hooks/useAlert";
import InputBox from "../../../../shared/InputBox/InputBox";

const AddNewProduct = () => {
  const [user, loading] = useAuthState(auth);

  const handleAddProductInfo = (event) => {
    event.preventDefault();
    const t = event.target;

    console.log(t.hello);
  };

  return (
    <section>
      {/* Page title */}
      <h2 className="dashboard-title flex-1 uppercase mb-3">
        <i className="fa-solid fa-square-plus mr-2"></i> Add a new product
      </h2>

      <form onSubmit={handleAddProductInfo}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-4">
          <div className="col-span-5 rounded p-3">
            <div className="bg-gray-100 rounded h-32 flex items-center justify-center flex-col cursor-pointer">
              <i className="fa-solid fa-cloud-arrow-up text-5xl text-gray-400"></i>
              <h4 className="text-gray-400">Upload product image</h4>
            </div>
          </div>

          <div className="col-span-7 bg-gray-100 rounded p-3">

            <InputBox value={{label : 'Product title', name : 'title', placeholder :'Enter the product title', required : true}} />

            <div className="flex items-center space-x-3">
                <InputBox value={{name : 'brand', label : 'Brand name', placeholder : 'Enter the brand name'}} />

                <InputBox value={{name : 'price', placeholder : 'Enter the product price', label : 'Price', type : 'number', required : 'true'}} />
            </div>

          </div>
        </div>

        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
};

export default AddNewProduct;
