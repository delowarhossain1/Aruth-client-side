import React, {useState, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./../../../../../firebase.init";
import useAlert from "./../../../../../hooks/useAlert";
import InputBox from "../../../../shared/InputBox/InputBox";
import SelectOption from "../../../../shared/SelectOption/SelectOption";
import Loading from "../../../../shared/Loading/Loading";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

const AddNewProduct = () => {
  const [user, loading] = useAuthState(auth);
  const [isCouponAvailable, setIsCouponAvailable] = useState(false);
  const [galleryImg, setGalleryImg] = useState([]);
  const { successToast } = useAlert();
  const navigate = useNavigate();
  const imgRef = useRef("");

  const URL = `http://localhost:5000/category-title?email=${user?.email}`;
  const { data: categoriesTitle, isLoading } = useQuery(
    ["loadCategoryTitle", user],
    () =>
      fetch(URL, {
        headers: {
          auth: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json())
  );

  const handleAddProductInfo = (event) => {
    event.preventDefault();
    const t = event.target;

    const name = t.title.value || "Product Title here...";
    const img = t.thumbnail.value || "";
    const brand = t.brand.value || "No brand";
    const price = t.price.value || 1;
    const availableQuantity = t.available.value || 1;
    const discount = t.discount.value || 0;
    const deliveryCharge = t.deliveryCharge.value || 0;
    const deliveryTime = t.deliveryTime.value || "1-2";
    const size = t.size.value || "";
    const couponCode = t?.couponCode?.value || null;
    const couponAmount = t?.couponAmount?.value || null;
    const list = t.list.value || "";
    const aboutProduct = t.aboutProduct.value || "";
    const category = t.category.value || categoriesTitle[0]?.text;
    const cashOnDelivery = t.cashOnDelivery.value || false;
    const type = t.type.value || false;

    const productInfo = {
      img,
      name,
      brand,
      ratings: 0,
      categories: category,
      discount: Number(discount),
      price: Number(price),
      popular: type === "true",
      galleryImg : [img, ...galleryImg],
      size: size.length ? size.split(", ") : [],
      cashOnDelivery: cashOnDelivery === "true",
      availableQuantity: Number(availableQuantity),
      deliveryWithin: {
        days: deliveryTime,
        charge: Number(deliveryCharge),
      },
      couponCode: {
        code: couponCode,
        amount: Number(couponAmount),
      },
      description: {
        list: list?.length ? list.split(",") : [],
        text: aboutProduct,
      },
      comments: [],
    };

    //  database action
    const URL = `http://localhost:5000/insert-product?email=${user?.email}`;

    fetch(URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        auth: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(productInfo),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.insertedId) {
          successToast("The product has been published.");
          navigate("/dashboard/products");
        }
      });
  };

  // Add gallery image
  const handleGalleryImg = () => {
    const galleryImgURL = imgRef.current.value;

    if (galleryImgURL && galleryImg.length <= 2) {
      const allURL = [...galleryImg, galleryImgURL];
      setGalleryImg(allURL);
    }
  };

  // Delete gallery image 
  const deleteGalleryImg = (index) => {
    const rest = galleryImg?.filter((g, i) => i !== index) ;
    setGalleryImg(rest);
  }

  if (loading || isLoading) {
    return <Loading />;
  }

  return (
    <section className="relative">
      {/* Page title */}
      <h2 className="dashboard-title flex-1 uppercase mb-5">
        <i className="fa-solid fa-square-plus mr-2"></i>
        Add a new product
      </h2>

      <form onSubmit={handleAddProductInfo} className="mt-8">
        {/* Upload button */}
        <button
          className="bg-[#5A76FD] p-2 rounded absolute top-0 right-0 text-white"
          type="submit"
        >
          <i className="fa-solid fa-cloud-arrow-up text-xl mr-2 text-white"></i>
          Upload
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-4">
          <div className="col-span-5 rounded p-3 bg-gray-100 flex flex-col justify-between">
            <div>
              {/* Thumbnail */}
              <InputBox
                value={{
                  label: "Thumbnail",
                  name: "thumbnail",
                  placeholder: "Enter The URL https://www",
                  required: true,
                  type: "url",
                }}
              />

              <div className="mt-4">
                {galleryImg?.map((img, index) => (
                  <div
                    className="flex items-center justify-between bg-white p-1 rounded mb-2 shadow"
                    key={index * Math.random()}
                  >
                    <img src={img} alt="gallery" className="w-12" />
                    <span>
                      <i class="fa-solid fa-circle-xmark text-2xl cursor-pointer text-red-500" onClick={()=> deleteGalleryImg(index)}></i>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <input
                type="url"
                placeholder="Enter The URL https://www"
                ref={imgRef}
                className=" border border-[#5A76FD] px-3 py-2 w-full rounded-full outline-none"
                disabled={galleryImg?.length >= 3}
              />
              <button
                className={`bg-[#5A76FD] p-2 rounded-full absolute top-0 right-0 border border-[#5A76FD] text-white ${
                  galleryImg?.length >= 3 && "cursor-not-allowed"
                }`}
                type="button"
                onClick={handleGalleryImg}
                disabled={galleryImg?.length >= 3}
              >
                Gallery IMG
              </button>
            </div>
          </div>

          <div className="col-span-7 bg-gray-100 rounded p-3">
            <InputBox
              value={{
                label: "Product title",
                name: "title",
                placeholder: "Enter The Product Title",
                required: true,
              }}
            />

            <div className="flex items-center space-x-3">
              <InputBox
                value={{
                  name: "brand",
                  label: "Brand name",
                  placeholder: "Enter The Brand Name",
                }}
              />

              <InputBox
                value={{
                  name: "price",
                  placeholder: "Enter The Product Price",
                  label: "Price",
                  type: "number",
                  required: true,
                }}
              />
            </div>

            <div className="flex items-center space-x-3">
              <InputBox
                value={{
                  name: "available",
                  label: "Available Quantity",
                  placeholder: "Enter The Available Quantity",
                  required: true,
                  type: "number",
                }}
              />

              <InputBox
                value={{
                  name: "discount",
                  placeholder: "Enter The Discount Amount",
                  label: "Discount Amount",
                }}
              />
            </div>

            <div className="flex items-center space-x-3">
              <InputBox
                value={{
                  name: "deliveryCharge",
                  label: "Delivery Charge",
                  placeholder: "Enter The Delivery Charge",
                  required: true,
                  type: "number",
                }}
              />

              <InputBox
                value={{
                  name: "deliveryTime",
                  placeholder: "Enter The Daily Time",
                  label: "Delivery Time",
                  required: true,
                }}
              />
            </div>

            <div className="flex items-center space-x-3">
              <InputBox
                value={{
                  name: "size",
                  label: "Size",
                  placeholder: "M, L, XL, XXL",
                  required: true,
                  type: "text",
                }}
              />
            </div>

            {/* Coupon code available */}
            {isCouponAvailable && (
              <div className="flex items-center space-x-3">
                <InputBox
                  value={{
                    name: "couponCode",
                    label: "Coupon code",
                    placeholder: "AR50",
                    type: "text",
                    required: true,
                  }}
                />

                <InputBox
                  value={{
                    name: "couponAmount",
                    placeholder: "$50",
                    label: "Coupon Amount",
                    required: true,
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Select & option */}
        <div className="bg-gray-100 p-3 rounded flex flex-col lg:flex-row justify-between items-center mt-3">
          <SelectOption
            value={{
              title: "Type",
              name: "type",
              options: [
                { value: true, text: "Popular Product" },
                { value: false, text: "Regular Product" },
              ],
            }}
          />
          <SelectOption
            value={{
              title: "Cash on delivery",
              name: "cashOnDelivery",
              options: [
                { value: true, text: "Available" },
                { value: false, text: "Not Available" },
              ],
            }}
          />

          <SelectOption
            onChange={(e) => setIsCouponAvailable(e.target.value === "true")}
            value={{
              title: "Coupon",
              name: "coupon",
              options: [
                { value: true, text: "Available" },
                { value: false, text: "Not Available" },
              ],
            }}
          />

          <SelectOption
            value={{
              name: "category",
              title: "Category",
              required: true,
              styles: "disabled",
              options: categoriesTitle,
            }}
          />
        </div>

        {/* Description */}
        <div className="mt-3 rounded flex flex-col lg:flex-row space-x-0 lg:space-x-5 space-y-5 lg:space-y-0">
          <div className="bg-gray-100 p-3 flex-1 rounded">
            <label htmlFor="list" className="text-gray-400 text-lg">
              Attribute List
            </label>
            <textarea
              name="list"
              className=" min-w-full min-h-[250px] rounded p-3 outline-none border border-black"
              placeholder="High Quality T-shirt, Stylish Design,  Material: Cotton"
              id="list"
            ></textarea>
          </div>

          <div className="bg-gray-100 p-3 flex-1 rounded">
            <label htmlFor="description" className="text-gray-400 text-lg">
              Description
            </label>
            <textarea
              name="aboutProduct"
              id="description"
              className=" min-w-full min-h-[250px] rounded p-3 outline-none border border-black"
              placeholder="Write something about the product."
            ></textarea>
          </div>
        </div>
      </form>
    </section>
  );
};

export default AddNewProduct;
