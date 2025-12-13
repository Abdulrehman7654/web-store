import React, { useCallback } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import AnimatedHeader from '../Components/AnimatedHeader';

// --- THEME CONSTANTS (Same as CheckoutPage) ---
const refinedCharcoal = '#212121'; // Main Text/Borders (Deep Grey/Black)
const signatureGold = '#B8860B'; // Main Accent Color (Metallic Gold)
const lightBackground = '#F7F7F7'; 
const goldSuccess = '#AA8C42'; // Darker gold/brown for a premium success status 


// --- SUCCESS ICON SVG (Elegantly styled) ---
const SuccessCheckmarkSVG = () => (
    <svg className="w-14 h-14 mx-auto mb-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 12l2 2 4-4M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" 
            stroke={refinedCharcoal} // Changed stroke to charcoal for contrast on gold background
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
        />
    </svg>
);


export default function ConfirmationPage() {
    const location = useLocation();
    const navigate = useNavigate();

    // Safely retrieve the state passed from the checkout page
    const orderDetails = location.state || {};

    const { 
        orderTotal, 
        codAmount, 
        deliveryCharge, 
        isConfirmed,
        orderData, // Contains fullName, address, phone, transactionId etc.
    } = orderDetails;

    // Redirect if no order data is present (e.g., direct navigation to /confirmation)
    if (!isConfirmed || !orderData) {
        setTimeout(() => navigate('/'), 2000); 
        return (
            <div className="min-h-screen flex items-center justify-center p-10" style={{ backgroundColor: lightBackground }}>
                <p className="text-xl font-semibold" style={{ color: refinedCharcoal }}>
                    Order Confirmed. Redirecting to home...
                </p>
            </div>
        );
    }
    
    // Function to generate and "download" the final invoice
    const handleDownloadFinalInvoice = useCallback(() => {
        const orderId = `SAR-${Date.now().toString().slice(-8)}`; 
        const date = new Date().toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' });
        
        const invoiceContent = `
=========================================
OFFICIAL SALES INVOICE - SAR TREND
=========================================
Order ID: #${orderId}
Invoice Date: ${date}

--- CUSTOMER & SHIPPING DETAILS ---
Name: ${orderData.fullName}
Phone: ${orderData.phone}
Email: ${orderData.email}
Shipping Address: 
  ${orderData.address}
  ${orderData.city}, ${orderData.zip}
  
--- PAYMENT BREAKDOWN ---
Delivery Charges (PAID): ${deliveryCharge}
Transaction ID: ${orderData.transactionId || 'N/A'}
Product Cost (COD - Due on Delivery): ${codAmount}

--- FINAL SUMMARY ---
Total Order Value: ${orderTotal}
Payment Method: Cash on Delivery (COD) + Advance Delivery Fee (EasyPaisa)
-----------------------------------------
Thank you for shopping with SAR TREND. Your order has been placed successfully and will be dispatched shortly.
=========================================
`;
        
        console.log("--- FINAL INVOICE CONTENT DOWNLOADED ---");
        
        // REAL FILE DOWNLOAD IMPLEMENTATION
        const blob = new Blob([invoiceContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `SAR_Invoice_Final_${orderId}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

    }, [orderData, orderTotal, codAmount, deliveryCharge]);


    return (
        <div className="px-4 sm:px-8 py-12 min-h-screen" style={{ backgroundColor: lightBackground }}>
            
            <AnimatedHeader
                title="Order Confirmation"
                subTitle="SAR Trend - Your order has been placed"
                signatureGold={signatureGold}
                refinedCharcoal={refinedCharcoal}
            />

            {/* Main Container - Border changed to Gold and reduced thickness */}
            <div className="max-w-7xl mx-auto mt-8 p-8 rounded-2xl shadow-2xl" 
                 style={{ backgroundColor: 'white', border: `2px solid ${signatureGold}` }}> 
                
                {/* Success Banner - Reduced padding and text size */}
                <div className="text-center p-6 mb-8 rounded-xl shadow-lg" 
                     style={{ backgroundColor: signatureGold, color: refinedCharcoal }}>
                    <SuccessCheckmarkSVG />
                    <h2 className="text-3xl font-black uppercase tracking-widest mb-1"> 
                        ORDER SUCCESSFUL!
                    </h2>
                    <p className="mt-1 text-lg font-medium"> 
                        A detailed confirmation email has been sent to **{orderData.email}**.
                    </p>
                </div>

                {/* Order Details Grid - Reduced gap */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10"> 
                    
                    {/* Payment Summary - Reduced padding, border thickness, and font size */}
                    <div className="p-6 rounded-xl border-2" style={{ borderColor: signatureGold, backgroundColor: '#FEFBF3' }}>
                        <h3 className="text-xl font-extrabold mb-4 uppercase" style={{ color: refinedCharcoal, letterSpacing: '1px' }}>
                            Payment Summary
                        </h3>
                        <div className="space-y-3 text-base">
                            <p className="flex justify-between border-b-2 pb-2" style={{borderColor: '#E5E7EB'}}>
                                <span className="font-semibold text-gray-600">Delivery Charges (Paid):</span>
                                <span className="font-extrabold text-lg" style={{ color: goldSuccess }}>{deliveryCharge}</span>
                            </p>
                            <p className="flex justify-between border-b-2 pb-2" style={{borderColor: '#E5E7EB'}}>
                                <span className="font-semibold text-gray-600">Product Cost (Due on Delivery):</span>
                                <span className="font-extrabold text-lg" style={{ color: refinedCharcoal }}>{codAmount}</span>
                            </p>
                            {/* Grand Total */}
                            <p className="flex justify-between text-2xl font-black pt-3 border-t-2" style={{ borderColor: refinedCharcoal }}>
                                <span style={{ color: refinedCharcoal }}>TOTAL ORDER VALUE:</span>
                                <span style={{ color: signatureGold }}>{orderTotal}</span>
                            </p>
                        </div>
                    </div>
                    
                    {/* Shipping Address - Reduced padding, border thickness, and font size */}
                    <div className="p-6 rounded-xl border-2" style={{ borderColor: signatureGold, backgroundColor: '#FEFBF3' }}>
                        <h3 className="text-xl font-extrabold mb-4 uppercase" style={{ color: refinedCharcoal, letterSpacing: '1px' }}>
                            Shipping Details
                        </h3>
                        <div className="space-y-2 text-base font-medium" style={{ color: refinedCharcoal }}>
                            <p className="font-extrabold text-lg border-b pb-1" style={{ color: signatureGold }}>{orderData.fullName}</p>
                            <p className="pt-2">**Phone:** {orderData.phone}</p>
                            <p>**Email:** {orderData.email}</p>
                            <p>**Address:** {orderData.address}</p>
                            <p>{orderData.city}, {orderData.zip}</p>
                        </div>
                    </div>
                </div>

                {/* Final Actions - Reduced gap between buttons */}
                <div className="flex flex-col sm:flex-row gap-4"> 
                    {/* Download Invoice Button - kept size small */}
                    <button 
                        type="button"
                        onClick={handleDownloadFinalInvoice}
                        className="flex-1 font-bold px-6 py-2.5 rounded-xl text-base transition-colors duration-300 uppercase tracking-widest shadow-xl hover:shadow-2xl flex items-center justify-center"
                        style={{ backgroundColor: refinedCharcoal, color: signatureGold }}
                    >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                        DOWNLOAD FINAL INVOICE
                    </button>
                    
                    {/* Continue Shopping Button - size adjusted to match the download button */}
                    <Link to="/" 
                        className="flex-1 text-center font-black px-6 py-2.5 rounded-xl text-base transition-all duration-300 uppercase tracking-widest shadow-lg hover:shadow-xl transform hover:scale-[1.01]"
                        style={{ backgroundColor: signatureGold, color: refinedCharcoal }}
                    >
                        CONTINUE SHOPPING
                    </Link>
                </div>

            </div>
        </div>
    );
}