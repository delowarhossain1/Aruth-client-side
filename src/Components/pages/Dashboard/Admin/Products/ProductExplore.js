import React, { useEffect, useRef, useState } from "react";
// import InputBox from "../../../../shared/InputBox/InputBox";
// import SelectOption from "../../../../shared/SelectOption/SelectOption";
// import DashboardTitle from "./../../DashboardTitle";
// import { useQuery } from "react-query";
// import auth from "../../../../../firebase.init";
// import { useAuthState } from "react-firebase-hooks/auth";
// import Loading from "../../../../shared/Loading/Loading";
// import { useParams } from 'react-router-dom';

const ProductExplore = () => {
  // const {id} = useParams();
  // const [user, loading] = useAuthState(auth);
  // const imgRef = useRef("");
  // const [isCouponAvailable, setIsCouponAvailable] = useState(false);
  // const [galleryImg, setGalleryImg] = useState([]);
  // const [name, setName] = useState("");
  // const [img, setImg] = useState("");
  // const [brand, setBrand] = useState("");
  // const [type, setType] = useState("");
  // const [category, setCategory] = useState("");
  // const [price, setPrice] = useState(0);
  // const [size, setSize] = useState("");
  // const [cashOnDelivery, setCashOnDelivery] = useState(false);
  // const [availableQuantity, setAvailableQuantity] = useState(0);
  // const [deliveryTime, setDeliveryTime] = useState("1-2");
  // const [deliveryCharge, setDeliveryCharge] = useState(0);
  // const [couponCode, setCouponCode] = useState("");
  // const [couponAmount, setCouponAmount] = useState(0);
  // const [list, setList] = useState("");
  // const [aboutProduct, setAboutProduct] = useState("");

  // // Load Category name
  // const URL = `http://localhost:5000/category-title?email=${user?.email}`;
  // const { data: categoriesTitle, isLoading } = useQuery(
  //   ["loadCategoryTitles", user],
  //   () =>
  //     fetch(URL, {
  //       headers: {
  //         auth: `Bearer ${localStorage.getItem("accessToken")}`,
  //       },
  //     }).then((res) => res.json())
  // );

  // // load product info;
  // const url = `http://localhost:5000/product-explore/${id}?email=${user?.email}`;
  // const { data: currentInfo, isLoading: currentInfoLoading } = useQuery(
  //   "product-explore",
  //   () =>
  //     fetch(url, {
  //       headers: {
  //         auth: `Bearer ${localStorage.getItem("accessToken")}`,
  //       },
  //     }).then((res) => res.json())
  // );

  // useEffect(() => {
  //   if (currentInfo) {
  //     const { img, name, brand, type, categories, price, galleryImg, size, cashOnDelivery, availableQuantity, deliveryWithin, couponCode, description } = currentInfo;

  //     setName(name);
  //     setImg(img);
  //     setBrand(brand);
  //     setType(type);
  //     setCategory(categories);
  //     setPrice(price);
  //     setSize(size?.join(','));
  //     setCashOnDelivery(cashOnDelivery);
  //     setAvailableQuantity(availableQuantity);
  //     setDeliveryTime(deliveryWithin?.days);
  //     setDeliveryCharge(deliveryWithin?.charge);
  //     setCouponCode(couponCode?.code);
  //     setCouponAmount(couponCode?.amount);
  //     setList(description?.list);
  //     setAboutProduct(description?.text);
  //     setGalleryImg(galleryImg);
  //   }
  // }, [currentInfo]);

  // // Add gallery image
  // const handleGalleryImg = () => {
  //   const galleryImgURL = imgRef.current.value;

  //   if (galleryImgURL && galleryImg.length <= 2) {
  //     const allURL = [...galleryImg, galleryImgURL];
  //     setGalleryImg(allURL);
  //   }

  //   // Set empty sting
  //   imgRef.current.value = "";
  // };

  // // Delete gallery image
  // const deleteGalleryImg = (index) => {
  //   const rest = galleryImg?.filter((g, i) => i !== index);
  //   setGalleryImg(rest);
  // };

  // const handleUpdateProductInfo = (event) => {
  //   event.preventDefault();

  //   // Make object by this info
  //   const productInfo = {
  //     img,
  //     name,
  //     brand,
  //     type,
  //     ratings: 0,
  //     categories: category,
  //     price: Number(price),
  //     galleryImg: [img, ...galleryImg],
  //     size: size.length ? size.split(", ") : [],
  //     cashOnDelivery: cashOnDelivery === "true",
  //     availableQuantity: Number(availableQuantity),
  //     deliveryWithin: {
  //       days: deliveryTime,
  //       charge: Number(deliveryCharge),
  //     },
  //     couponCode: {
  //       code: couponCode,
  //       amount: Number(couponAmount),
  //     },
  //     description: {
  //       list: list?.length ? list.split(",") : [],
  //       text: aboutProduct,
  //     },
  //   };

  //   console.log(productInfo);
  // };  

  // // Loading status
  // if (isLoading || loading || currentInfoLoading) {
  //   return <Loading />;
  // }

  return (
    // <section className="relative">
    //   {/* Page title */}
    //   <DashboardTitle
    //     value={{ text: "Update Product info", icon: "fa-solid fa-square-plus" }}
    //   />

    //   <form onSubmit={handleUpdateProductInfo} className="mt-8">
    //     {/* Upload button */}
    //     <button
    //       className="bg-[#5A76FD] p-2 rounded absolute top-0 right-0 text-white"
    //       type="submit"
    //     >
    //       <i className="fa-solid fa-cloud-arrow-up text-xl mr-2 text-white"></i>
    //       Upload
    //     </button>

    //     <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-4">
    //       <div className="col-span-5 rounded p-3 bg-gray-100 flex flex-col justify-between">
    //         <div>
    //           {/* Thumbnail */}
    //           <InputBox
    //             onChange={(e)=> setImg(e.target.value)}
    //             value={{
    //               v : img,
    //               label: "Thumbnail",
    //               name: "thumbnail",
    //               placeholder: "Enter The URL https://www",
    //               required: true,
    //               type: "url",
    //             }}
    //           />

    //           <div className="mt-4">
    //             {galleryImg?.map((img, index) => (
    //               <div
    //                 className="flex items-center justify-between bg-white p-1 rounded mb-2 shadow"
    //                 key={index * Math.random()}
    //               >
    //                 <img src={img} alt="gallery" className="w-12" />
    //                 <span>
    //                   <i
    //                     className="fa-solid fa-circle-xmark text-2xl cursor-pointer text-red-500"
    //                     onClick={() => deleteGalleryImg(index)}
    //                   ></i>
    //                 </span>
    //               </div>
    //             ))}
    //           </div>
    //         </div>

    //         <div className="relative">
    //           <input
    //             type="url"
    //             placeholder="Enter The URL https://www"
    //             ref={imgRef}
    //             className=" border border-[#5A76FD] px-3 py-2 w-full rounded-full outline-none"
    //             disabled={galleryImg?.length >= 3}

    //           />
    //           <button
    //             className={`bg-[#5A76FD] p-2 rounded-full absolute top-0 right-0 border border-[#5A76FD] text-white ${
    //               galleryImg?.length >= 3 && "cursor-not-allowed"
    //             }`}
    //             type="button"
    //             onClick={handleGalleryImg}
    //             disabled={galleryImg?.length >= 3}
    //           >
    //             Gallery IMG
    //           </button>
    //         </div>
    //       </div>

    //       <div className="col-span-7 bg-gray-100 rounded p-3">
    //         <InputBox
    //           onChange={(e)=> setName(e.target.value)}
    //           value={{
    //             v : name,
    //             label: "Product title",
    //             name: "title",
    //             placeholder: "Enter The Product Title",
    //             required: true,
    //           }}
    //         />

    //         <div className="flex items-center space-x-3">
    //           <InputBox
    //             onChange={(e)=> setBrand(e.target.value)}
    //             value={{
    //               v : brand,
    //               name: "brand",
    //               label: "Brand name",
    //               placeholder: "Enter The Brand Name",
    //             }}
    //           />

    //           <InputBox
    //             onChange={(e)=> setPrice(e.target.value)}
    //             value={{
    //               v : price,
    //               name: "price",
    //               placeholder: "Enter The Product Price",
    //               label: "Price",
    //               type: "number",
    //               required: true,
    //             }}
    //           />
    //         </div>

    //         <div className="flex items-center space-x-3">
    //           <InputBox
    //             onChange={(e)=> setAvailableQuantity(e.target.value)}
    //             value={{
    //               v: availableQuantity,
    //               name: "available",
    //               label: "Available Quantity",
    //               placeholder: "Enter The Available Quantity",
    //               required: true,
    //               type: "number",
    //             }}
    //           />

    //           <InputBox
    //             onChange={(e)=> setSize(e.target.value)}
    //             value={{
    //               v : size,
    //               name: "size",
    //               label: "Size",
    //               placeholder: "M, L, XL, XXL",
    //               type: "text",
    //             }}
    //           />
    //         </div>

    //         <div className="flex items-center space-x-3">
    //           <InputBox
    //             onChange={(e)=> setDeliveryCharge(e.target.value)}
    //             value={{
    //               v : deliveryCharge,
    //               name: "deliveryCharge",
    //               label: "Delivery Charge",
    //               placeholder: "Enter The Delivery Charge",
    //               required: true,
    //               type: "number",
    //             }}
    //           />

    //           <InputBox
    //             onChange={(e)=> setDeliveryTime(e.target.value)}
    //             value={{
    //               v : deliveryTime,
    //               name: "deliveryTime",
    //               placeholder: "Enter The Daily Time",
    //               label: "Delivery Time",
    //               required: true,
    //             }}
    //           />
    //         </div>

    //         {/* Coupon code available */}
    //         {isCouponAvailable && (
    //           <div className="flex items-center space-x-3">
    //             <InputBox
    //               onChange={(e)=> setCouponCode(e.target.value)}
    //               value={{
    //                 v : couponCode,
    //                 name: "couponCode",
    //                 label: "Coupon code",
    //                 placeholder: "AR50",
    //                 type: "text",
    //                 required: true,
    //               }}
    //             />

    //             <InputBox
    //               onChange={(e)=> setCouponAmount(e.target.value)}
    //               value={{
    //                 v : couponAmount,
    //                 name: "couponAmount",
    //                 placeholder: "$50",
    //                 label: "Coupon Amount",
    //                 required: true,
    //               }}
    //             />
    //           </div>
    //         )}
    //       </div>
    //     </div>

    //     {/* Select & option */}
    //     <div className="bg-gray-100 p-3 rounded flex flex-col lg:flex-row justify-between items-center mt-3">
    //       <SelectOption
    //         onChange={(e)=> setType(e.target.value)}
    //         value={{
    //           title: "Type",
    //           name: "type",
    //           options: [
    //             { value: "regular", text: "Regular Product" },
    //             { value: "popular", text: "Popular Product" },
    //             { value: "justForYou", text: "Just for you" },
    //           ],
    //         }}
    //       />
    //       <SelectOption
    //         onChange={(e)=> setCashOnDelivery(e.target.value)}
    //         value={{
    //           title: "Cash on delivery",
    //           name: "cashOnDelivery",
    //           options: [
    //             { value: false, text: "Not Available" },
    //             { value: true, text: "Available" },
    //           ],
    //         }}
    //       />

    //       <SelectOption
    //         onChange={(e) => setIsCouponAvailable(e.target.value === "true")}
    //         value={{
    //           title: "Coupon",
    //           name: "coupon",
    //           options: [
    //             { value: false, text: "Not Available" },
    //             { value: true, text: "Available" },
    //           ],
    //         }}
    //       />

    //       <SelectOption
    //         onChange={(e)=> setCategory(e.target.value)}
    //         value={{
    //           name: "category",
    //           title: "Category",
    //           required: true,
    //           styles: "disabled",
    //           options: categoriesTitle,
    //         }}
    //       />
    //     </div>

    //     {/* Description */}
    //     <div className="mt-3 rounded flex flex-col lg:flex-row space-x-0 lg:space-x-5 space-y-5 lg:space-y-0">
    //       <div className="bg-gray-100 p-3 flex-1 rounded">
    //         <label htmlFor="list" className="text-gray-400 text-lg">
    //           Attribute List
    //         </label>
    //         <textarea
    //           onChange={(e)=> setList(e.target.value)}
    //           name="list"
    //           value ={list}
    //           className=" min-w-full min-h-[250px] rounded p-3 outline-none border border-black"
    //           placeholder="High Quality T-shirt, Stylish Design,  Material: Cotton"
    //           id="list"
    //         ></textarea>
    //       </div>

    //       <div className="bg-gray-100 p-3 flex-1 rounded">
    //         <label htmlFor="description" className="text-gray-400 text-lg">
    //           Description
    //         </label>
    //         <textarea
    //           onChange={(e)=> setAboutProduct(e.target.value)}
    //           name="aboutProduct"
    //           id="description"
    //           value={aboutProduct}
    //           className=" min-w-full min-h-[250px] rounded p-3 outline-none border border-black"
    //           placeholder="Write something about the product."
    //         ></textarea>
    //       </div>
    //     </div>
    //   </form>
    // </section>
    <></>
  );
};

export default ProductExplore;
