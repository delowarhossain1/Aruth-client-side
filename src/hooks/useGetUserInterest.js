import { useState } from "react";
import { useQuery } from 'react-query';


const useGetUserInterest = () => {
    const today = new Date().toDateString();

    // Load Product category name;
    const {data:categoriesName} = useQuery('categories-names', ()=>(
        fetch()
        .then(res => res.json())
    ));

    // Store function
    function storeFun(category){
        localStorage.setItem('category', JSON.stringify([category]))
    }

    // Store interested category in localStorage;
    function storeInterestedCategory(category){
        const storedInfo = localStorage.getItem('category');
        const storedCategory = JSON.parse(storedInfo);

        if(storedCategory){
            const availableCategories = categoriesName?.filter(c => c?.name === )
        }
        else {  
            storeFun({category : 1});
        }  
    }

    return {storeInterestedCategory}
};

export default useGetUserInterest;