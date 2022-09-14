import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const date = new Date();
    
    return (
        <footer className='bg-[#1B1C20] py-6 text-white text-sm'>
            <div className=' w-[95%] mx-auto grid gap-5 md:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>

                <div>
                    <h2 className='text-xl mb-3 uppercase'>About us</h2>

                    <p className=' text-justify'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus odit, nisi numquam pariatur doloremque deleniti est placeat impedit, distinctio voluptas officia itaque error temporibus quis excepturi delectus tenetur praesentium cumque.</p>
                </div>

                <div>
                    <h2 className='text-xl mb-3 uppercase'>HELP</h2>

                    <ul>
                        <li>Mob : 01581-817667</li>
                        <li>Email : support@aruot.com</li>
                        <li>Address : Chattogram, Bangladesh</li>
                    </ul>
                </div>

                <div>
                    <h2 className='text-xl mb-3 uppercase'>POLICIES</h2>

                    <ul>
                        <li>
                            <Link to='/' className='hover:text-slate-500'>Privacy Policy</Link>
                        </li>
                        <li>
                            <Link to='/terms-and-conditions' className='hover:text-slate-500'>Terms & Condition</Link>
                        </li>
                        <li>
                            <Link to='/return-policy' className='hover:text-slate-500'>Returns</Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h2 className='text-xl mb-3 uppercase'> SOCIAL Media</h2>

                    <div className='flex items-center space-x-5'>
                        <a href='https://facebook.com/aaruot?_rdc=1&_rdr' target='_blank' rel="noreferrer">
                            <i className="fa-brands fa-facebook-f text-2xl hover:text-[#4267B2]"></i>
                        </a>

                        <Link to='/'>
                            <i className="fa-brands fa-twitter text-2xl hover:text-[#1DA1F2]"></i>
                        </Link>

                        <Link to='/'>
                        <i className="fa-brands fa-square-instagram text-2xl hover:text-[#3f729b]"></i>
                        </Link>
                    </div>
                </div>
            </div>

            <div className='pt-5 text-center'>
                <p className='uppercase'>&copy;COPYRIGHT {date.getFullYear()} Aruth, ALL RIGHTS RESERVED</p>
            </div>
        </footer>
    );
};

export default Footer;