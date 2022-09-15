import React from 'react';

const DashboardTitle = ({value = {}}) => {
    const {text = 'Title', icon = `fa-solid fa-house`} = value;

    return (
        <div className='flex items-center'>
            <h4 className='text-primary'><i className={`${icon}`}></i></h4>
            <h4 className='text-xl text-primary ml-2'>{text}</h4>
        </div>
    );
};

export default DashboardTitle;