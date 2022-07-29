import React from 'react';

const RatingsStar = (star) => {
    let totalStar = Number(star);
    let solidStarCount = 0;
    let halfStarCount = 0;
    let blankStarCount = 0;

    if(Number.isInteger(totalStar)){
        solidStarCount = totalStar;
        blankStarCount = 5 - totalStar;
    }
    else{
        let solidStar = Math.trunc(totalStar);
        let blankStar = 5 - Math.ceil(totalStar); 

        solidStarCount = solidStar;
        blankStarCount = blankStar;
        halfStarCount = 1;
    }

    return (
        <div className='flex items-center'>
            {
                [...Array(solidStarCount)]?.map(star => (
                    <i class="fa-solid fa-star text-yellow-500"></i>
                ))
            }
            {
                [...Array(halfStarCount)]?.map(star => (
                    <i class="fa-solid fa-star-half-stroke text-yellow-500"></i>
                ))
            }
            {
                [...Array(blankStarCount)]?.map(star => (
                    <i class="fa-solid fa-star text-gray-300"></i>
                ))
            }
        </div>
    );
};

export default RatingsStar;