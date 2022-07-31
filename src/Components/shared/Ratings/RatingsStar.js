import React from 'react';

const RatingsStar = ({star = 0, styles = ''}) => {
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
                [...Array(solidStarCount)]?.map((star, index) => (
                    <i className={`fa-solid fa-star text-sm text-yellow-500 ${styles}`} key={index}></i>
                ))
            }
            {
                [...Array(halfStarCount)]?.map((star, index) => (
                    <i className={`fa-solid fa-star-half-stroke text-sm text-yellow-500 ${styles}`} key={index}></i>
                ))
            }
            {
                [...Array(blankStarCount)]?.map((star, index) => (
                    <i className={`fa-solid fa-star text-sm text-gray-300 ${styles}`} key={index}></i>
                ))
            }
        </div>
    );
};

export default RatingsStar;