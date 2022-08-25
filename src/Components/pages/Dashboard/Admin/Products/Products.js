import React, { useEffect, useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from "react-router-dom";
import Loading from "../../../../shared/Loading/Loading";
import auth from './../../../../../firebase.init';
import ProductCart from './../../../../shared/Cart/ProductCart';

const Products = () => {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    const [products, setProducts] = useState();
    const [productLoading, setProductLoading] = useState(true);

    useEffect(()=>{
        const URL = `http://localhost:5000/products?email=${user?.email}`;

        fetch(URL, {
            headers : {
                auth : `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setProducts(data);
            setProductLoading(false);
        })
    }, [user]);


    if(loading || productLoading){
        return <Loading />
    }

  return (
    <section>
      {/* Section title */}
      <h2 className="dashboard-title">
        <i className="fa-solid fa-store mr-2"></i> Products
      </h2>

      <div>
        {/* Product table */}
        <div className="overflow-x-auto">
          <table className="table w-full text-center">
            <thead>
              <tr>
                <th>#No</th>
                <th>IMG</th>
                <th>Name</th>
                <th>Price</th>
                <th>Coupon</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
                {
                    products?.map((product, index) => (
            
                        <tr key={product?._id}>
                        <th>{index + 1}</th>
                        <td>
                            <img src={product?.img} alt="product" className="w-10" />
                        </td>
                        <td>
                            {product?.name?.length > 20 ? product?.name.slice(0, 20) +'...' : product?.name}
                        </td>
                        <td>${product?.price}</td>
                        <td>{product?.couponCode ? 'Available' : 'Not Available'}</td>
                        <td>
                            <button className="bg-green-400 p-2 rounded" onClick={()=> navigate(`explore/${product?._id}`)}>Details</button>
                        </td>
                      </tr>
                    ))
                }
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Products;
