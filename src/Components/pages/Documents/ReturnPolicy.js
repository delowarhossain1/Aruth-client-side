import React from 'react';

const ReturnPolicy = () => {
    return (
        <section className='py-5'>
            <h3 className='text-2xl font-semi-bold'>RETURN POLICY</h3>
            <h5 className='mt-2'>Last updated September 01, 2022</h5>

            <p className='mt-5 text-gray-500'>Thank you for your purchase. We hope you are happy with your purchase. However, if you are not completely satisfied with your purchase for any reason, you may return it to us for an exchange only. Please see below for more information on our return policy.</p><br />

            <h2 className='text-lg'>RETURNS</h2>
            <p className='mt-2 text-gray-500'>All returns must be postmarked within three (3) days of the purchase date. All returned items must be in new and unused condition, with all original tags and labels attached.</p>


            <h2 className='text-lg mt-5'>RETURN PROCESS</h2>
            <p className='mt-2 text-gray-500'>To return an item, please email customer service at return@aruot.com to obtain a Return Merchandise Authorization (RMA) number. After receiving an RMA number, place the item securely in its original packaging, and mail your return to the following address: <span className='text-blue-500'>return@aruot.com</span></p><br />

            <p className='mt-2 text-gray-500'>Please note, you will be responsible for all return shipping charges. We strongly recommend that you use a trackable method to mail your return.</p>

            <h2 className='text-lg mt-5'>REFUNDS</h2>
            <p className='mt-2 text-gray-500'>After receiving your return and inspecting the condition of your item, we will process your exchange. Please allow at least seven (7) days from the receipt of your item to process your exchange. We will notify you by email when your return has been processed.</p>


            <h2 className='text-lg mt-3'>EXCEPTIONS</h2>
            <p className='mt-2 text-gray-500'>For defective or damaged products, please contact us at the contact details below to arrange a refund or exchange.</p>
            <p>Please Note</p>

            <ul className='mt-3 ml-7 list-disc'>
                <li>Discounted items are FINAL SALE and it cannot be returned.</li>
                <li>Return is not possible if the delivered product is damaged by the customer</li>
                <li>If there is a problem with the product, it should be reported within 3 hours of receiving the product</li>
                <li>Appropriate evidence (photos/videos) is required.</li>
            </ul>

            <h2 className='text-lg mt-3'>QUESTIONS</h2>
            <p className='mt-2 text-gray-500'>If you have any questions concerning our return policy, please contact us at: 01581817667 <br /> <span className='text-blue-500'>return@aruot.com </span>
</p>

        </section>
    );
};

export default ReturnPolicy;