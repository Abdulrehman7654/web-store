// src/pages/CheckoutPage.jsx
import React, { useState, useCallback, useEffect } from "react";
import { useCart } from "../context/CartContext";
import AnimatedHeader from '../Components/AnimatedHeader';
import { useNavigate } from "react-router-dom";

const THEME = {
  charcoal: '#111827',
  gold: '#B8860B',
  goldAccent: '#E6B857',
  bg: '#F7F7F7',
  success: '#AA8C42',
  muted: '#6B7280',
  paneBlack: '#0b0b0b'
};

// const USD_TO_PKR_RATE = 280;
const DELIVERY_PKR = 350;
const DELIVERY_USD = DELIVERY_PKR;

// const formatPKRFromUSD = (usd) => {
//   const pkr = Math.round((parseFloat(usd) || 0) * USD_TO_PKR_RATE);
//   return new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', maximumFractionDigits: 0 }).format(pkr).replace('PKR', 'Rs');
// };

const STEPS = { SHIPPING: 1, PAYMENT: 2, REVIEW: 3 };

const IconPhone = ({ className = 'w-7 h-7' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M21 16.5v3a1 1 0 01-1.1 1 19.91 19.91 0 01-8.8-3.2 19.91 19.91 0 01-6.4-6.4A19.91 19.91 0 013.5 4.1 1 1 0 014.5 3h3a1 1 0 01.9.6l1.2 3a1 1 0 01-.2 1L8.4 9.9a12.1 12.1 0 005 5l1.7-1.9a1 1 0 011-.2l3 1.2a1 1 0 01.6.9z" stroke={THEME.gold} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Field = ({ label, id, type = 'text', value, onChange, required = true, placeholder, error }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-xs font-semibold uppercase mb-2" style={{ color: THEME.gold }}>
      {label}{required && <span className="ml-1 text-red-600">*</span>}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      value={value || ''}
      onChange={onChange}
      className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 transition-shadow ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
      style={{ backgroundColor: 'white', color: THEME.charcoal, borderColor: error ? '#EF4444' : '#E5E7EB' }}
      placeholder={placeholder}
    />
    {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
  </div>
);

export default function CheckoutPage() {
  const cartCtx = useCart();
  const cartItems = cartCtx?.cartItems || [];
  const clearCart = cartCtx?.clearCart;
  const setCartItems = cartCtx?.setCartItems;
  const navigate = useNavigate();

  const [step, setStep] = useState(STEPS.SHIPPING);
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', address: '', city: '', zip: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotalUSD = cartItems.reduce((s, it) => {
    if (Array.isArray(it.products) && it.products.length) {
      const sumProducts = it.products.reduce((ps, p) => ps + (Number(p.price ?? p.rate) || 0), 0);
      return s + (sumProducts * (it.quantity || 1));
    }
    return s + ((Number(it.price ?? it.rate) || 0) * (it.quantity || 1));
  }, 0);

  const shippingUSD = DELIVERY_USD;
  const grandUSD = subtotalUSD + shippingUSD;

  const subtotalPKR = subtotalUSD;
  const shippingPKR = shippingUSD;
  const grandPKR = grandUSD;

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      const t = setTimeout(() => navigate('/cart'), 900);
      return () => clearTimeout(t);
    }
  }, [cartItems, navigate]);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  const validateShipping = () => {
    const newErrors = {};
    
    if (!form.fullName || !form.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!form.email || !form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!form.phone || !form.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (form.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!form.address || !form.address.trim()) {
      newErrors.address = 'Street address is required';
    }
    
    if (!form.city || !form.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!form.zip || !form.zip.trim()) {
      newErrors.zip = 'Postal code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const downloadInvoice = () => {
    const id = `SAR-${Date.now().toString().slice(-8)}`;
    const lines = [
      'SAR TREND - PREVIEW INVOICE',
      `Order: ${id}`,
      `Date: ${new Date().toLocaleString()}`,
      '---',
      `Name: ${form.fullName || 'N/A'}`,
      `Address: ${form.address || 'N/A'}, ${form.city || ''} ${form.zip || ''}`,
      `Phone: ${form.phone || 'N/A'}`,
      '---',
      `Subtotal: ${subtotalPKR}`,
      `Delivery: ${shippingPKR}`,
      `Total: ${grandPKR}`,
      'Payment: Cash on Delivery'
    ].join('\n');

    const blob = new Blob([lines], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `SAR_invoice_${id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const placeOrder = async () => {
    if (!validateShipping()) {
      alert('Please fill all required shipping details before placing your order.');
      setStep(STEPS.SHIPPING);
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData = {
        products: cartItems.map(item => {
          if (Array.isArray(item.products) && item.products.length) {
            return item.products.map(p => ({
              productId: p.id || p._id,
              quantity: item.quantity || 1,
              price: Math.round((Number(p.price ?? p.rate) || 0))
            }));
          }
          return {
            productId: item.id || item._id,
            quantity: item.quantity || 1,
            price: Math.round((Number(item.price ?? item.rate) || 0))
          };
        }).flat(),
        
        customerName: form.fullName.trim(),
        customerEmail: form.email.trim(),
        customerPhone: form.phone.trim(),
        customerAddress: `${form.address.trim()}, ${form.city.trim()}, ${form.zip.trim()}`,
        paymentMethod: "COD",
        paymentStatus: "pending",
        orderStatus: "pending",
        totalAmount: Math.round(grandUSD)
      };

      // Create order
      const response = await fetch('http://localhost:5000/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      const result = await response.json();
      const orderId = result._id || result.id;

      // Send email notification to admin
      try {
        await fetch('http://localhost:5000/api/orders/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderId: orderId,
            customerName: form.fullName.trim(),
            customerEmail: form.email.trim(),
            customerPhone: form.phone.trim(),
            customerAddress: `${form.address.trim()}, ${form.city.trim()}, ${form.zip.trim()}`,
            totalAmount: grandPKR,
            items: cartItems,
            adminEmail: 'abdulrehmanshahid486@gmail.com'//if you want to change the recipient mail in future
          })
        });
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        // Continue even if email fails
      }

      // Clear cart
      if (typeof clearCart === 'function') {
        clearCart();
      } else if (typeof setCartItems === 'function') {
        setCartItems([]);
      }

      // Navigate to confirmation page
      navigate('/confirmation', { 
        state: { 
          orderTotal: grandPKR, 
          details: form,
          orderId: orderId,
          orderData: orderData
        },
        replace: true
      });

    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const ShippingCard = () => (
    <div className="mb-6 p-6 rounded-2xl shadow-sm bg-white">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 rounded-lg bg-white border" style={{ borderColor: '#eee' }}>
          <IconPhone />
        </div>
        <div>
          <h3 className="text-lg font-bold">Shipping</h3>
          <p className="text-sm text-gray-500">Enter where you want your items delivered.</p>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Full name" id="fullName" value={form.fullName} onChange={onChange} error={errors.fullName} placeholder="John Doe"/>
          <Field label="Email" id="email" type="email" value={form.email} onChange={onChange} error={errors.email} placeholder="john@example.com"/>
          <Field label="Phone" id="phone" type="tel" value={form.phone} onChange={onChange} error={errors.phone} placeholder="+92 300 1234567"/>
          <Field label="City" id="city" value={form.city} onChange={onChange} error={errors.city} placeholder="Lahore"/>
          <div className="md:col-span-2">
            <Field label="Street address" id="address" value={form.address} onChange={onChange} error={errors.address} placeholder="House # 123, Street 45"/>
          </div>
          <Field label="Postal code" id="zip" value={form.zip} onChange={onChange} error={errors.zip} placeholder="54000"/>
        </div>

        <div className="mt-6 flex justify-end">
          <button 
            onClick={() => {
              if (validateShipping()) {
                setStep(STEPS.PAYMENT);
              }
            }}
            type="button"
            className="px-6 py-3 rounded-lg font-semibold shadow" 
            style={{ background: `linear-gradient(90deg, ${THEME.gold}, ${THEME.goldAccent})`, color: THEME.paneBlack }}
          >
            Continue to payment
          </button>
        </div>
      </div>
    </div>
  );

  const PaymentCard = () => {
    return (
      <div className="mb-6">
        <div className="p-6 rounded-2xl shadow-sm bg-white border-2" style={{ borderColor: THEME.gold }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="text-4xl">💵</div>
              <div>
                <div className="text-xl font-extrabold">Cash on Delivery</div>
                <div className="text-sm text-gray-600">Pay when you receive your order</div>
              </div>
            </div>
            <div className="text-lg font-bold px-4 py-2 rounded-lg" style={{ background: THEME.gold, color: 'white' }}>
              Available
            </div>
          </div>

          <div className="mt-4 p-5 rounded-lg" style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}>
            <div className="flex justify-between mb-3">
              <span className="text-sm font-medium text-gray-600">Products Cost</span>
              <strong className="text-lg">{subtotalPKR}</strong>
            </div>
            <div className="flex justify-between mb-3">
              <span className="text-sm font-medium text-gray-600">Delivery Charges</span>
              <strong className="text-lg">{shippingPKR}</strong>
            </div>
            <hr className="my-3 border-gray-300" />
            <div className="flex justify-between items-center">
              <span className="text-base font-bold">Total Amount Due on Delivery</span>
              <strong className="text-2xl" style={{ color: THEME.gold }}>{grandPKR}</strong>
            </div>
          </div>

          <div className="mt-5 p-4 rounded-lg bg-blue-50 border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Please keep the exact amount ready when the delivery agent arrives.
            </p>
          </div>

          <div className="mt-6 flex justify-between gap-3">
            <button onClick={() => setStep(STEPS.SHIPPING)} className="px-6 py-3 rounded-lg font-semibold border border-gray-300">
              Back
            </button>
            <button onClick={() => setStep(STEPS.REVIEW)} className="px-6 py-3 rounded-lg font-semibold shadow" style={{ background: `linear-gradient(90deg, ${THEME.gold}, ${THEME.goldAccent})`, color: THEME.paneBlack }}>
              Continue to review
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ReviewCard = () => (
    <div className="p-6 rounded-2xl shadow-sm bg-white">
      <h3 className="text-lg font-extrabold mb-3">Review & Confirm</h3>

      <div className="mb-4">
        <div className="text-xs text-gray-500">Shipping</div>
        <div className="font-medium">{form.fullName || '—'} • {form.phone || '—'}</div>
        <div className="text-sm text-gray-500 mt-1">{form.address ? `${form.address}, ${form.city} ${form.zip}` : 'No address provided'}</div>
      </div>

      <div className="mb-4">
        <div className="text-xs text-gray-500">Order items</div>
        <div className="mt-3 space-y-3">
          {cartItems.map((item) => (
            <div key={item.id} className="p-3 rounded-md border flex items-start justify-between">
              <div>
                <div className="font-semibold">{item.name}</div>
                {Array.isArray(item.products) && item.products.length ? (
                  <ul className="text-sm text-gray-600 mt-2 list-disc list-inside">
                    {item.products.map(p => {
                      const priceNum = Number(p.price ?? p.rate) || 0;
                      return (
                        <li key={p.id} className="flex items-center justify-between">
                          <span>{p.name}</span>
                          <span className="ml-4">
                            {priceNum === 0 ? <span className="text-green-600 font-bold">FREE</span> : <span className="font-medium">{priceNum}</span>}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <div className="text-sm text-gray-600 mt-2">
                    {(Number(item.price ?? item.rate) === 0 || item.isFree) ? <span className="text-green-600 font-bold">FREE</span> : <span className="font-medium">{item.price ?? item.rate}</span>}
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">QTY</div>
                <div className="font-semibold">{item.quantity || 1}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <div className="text-xs text-gray-500">Payment summary</div>
        <div className="mt-2 p-3 rounded-md border bg-white">
          <div className="flex justify-between"><span>Products</span><strong>{subtotalPKR}</strong></div>
          <div className="flex justify-between mt-2"><span>Delivery</span><strong>{shippingPKR}</strong></div>
          <div className="flex justify-between mt-4 pt-3 border-t-2"><span className="font-bold">Total (COD)</span><span className="text-lg font-extrabold" style={{ color: THEME.gold }}>{grandPKR}</span></div>
        </div>
      </div>

      <div className="flex gap-3 mt-4 flex-col md:flex-row">
        <button onClick={downloadInvoice} className="px-5 py-3 rounded shadow font-semibold" style={{ background: THEME.gold, color: THEME.paneBlack }}>Download invoice</button>
        <button onClick={() => setStep(STEPS.PAYMENT)} className="px-5 py-3 rounded border">Edit payment</button>
        <div className="ml-auto">
          <button onClick={placeOrder} disabled={isSubmitting} className="px-6 py-3 rounded font-bold disabled:opacity-50" style={{ background: THEME.paneBlack, color: THEME.gold }}>
            {isSubmitting ? 'Placing order...' : 'Place order'}
          </button>
        </div>
      </div>
    </div>
  );

  const SummaryPanel = () => {
    return (
      <aside className="p-6 rounded-2xl shadow-2xl sticky top-6" style={{ background: THEME.paneBlack, color: 'white', border: `1px solid rgba(184,134,11,0.12)` }}>
        <h4 className="font-bold text-2xl mb-4" style={{ color: THEME.gold }}>Order Summary</h4>

        <div className="mb-4 p-4 rounded-xl" style={{ background: '#0f0f0f', border: `1px solid rgba(255,255,255,0.03)` }}>
          <div className="flex justify-between items-center mb-2">
            <div>
              <div className="text-sm text-gray-400">Shipping</div>
              <div className="font-medium">{form.fullName || 'Guest'}</div>
            </div>
            <div className="text-sm font-bold" style={{ color: THEME.gold }}>{shippingPKR}</div>
          </div>
          <div className="text-xs text-gray-500">{form.address ? `${form.address}, ${form.city}` : 'No shipping address yet'}</div>
        </div>

        <div className="mb-4 p-4 rounded-xl" style={{ background: '#0f0f0f', border: `1px solid rgba(255,255,255,0.03)` }}>
          <div className="flex justify-between items-center mb-2">
            <div>
              <div className="text-sm text-gray-400">Payment Method</div>
              <div className="font-medium">Cash on Delivery</div>
            </div>
            <div className="text-sm font-bold" style={{ color: THEME.success }}>Available</div>
          </div>
          <div className="mt-3 text-xs text-gray-400">Pay the full amount when your order arrives</div>
        </div>

        <div className="p-4 rounded-xl" style={{ background: '#0f0f0f', border: `1px solid rgba(255,255,255,0.03)` }}>
          <div className="flex justify-between items-center mb-2">
            <div>
              <div className="text-sm text-gray-400">Total Value</div>
              <div className="font-medium text-lg">{cartItems.length} items</div>
            </div>
            <div className="text-2xl font-extrabold" style={{ color: THEME.gold }}>{grandPKR}</div>
          </div>
          <div className="mt-3 text-xs text-gray-400">TO BE PAID ON DELIVERY</div>
        </div>

        <div className="mt-6">
          <button onClick={() => {
            if (step === STEPS.SHIPPING) {
              if (validateShipping()) setStep(STEPS.PAYMENT);
            } else {
              setStep(STEPS.REVIEW);
            }
          }} className="w-full px-5 py-3 rounded-lg font-bold" style={{ background: THEME.gold, color: THEME.paneBlack }}>
            {step === STEPS.SHIPPING ? 'Continue' : 'Review Order'}
          </button>
        </div>
      </aside>
    );
  };

  return (
    <div className="min-h-screen py-12 px-6" style={{ backgroundColor: THEME.bg }}>
      <AnimatedHeader title="Secure Checkout" subTitle="Complete your order" signatureGold={THEME.gold} refinedCharcoal={THEME.charcoal} />

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        <section className="lg:col-span-8">
          <div className="mb-6 flex items-center gap-4">
            {Object.entries(STEPS).map(([k, s]) => (
              <div key={k} className="flex-1 text-center">
                <div className={`mx-auto w-9 h-9 rounded-full flex items-center justify-center mb-2 ${step >= s ? 'bg-black text-yellow-400' : 'bg-white text-gray-400 border'}`}>
                  {step > s ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke={THEME.gold} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg> : s}
                </div>
                <div className="text-xs uppercase font-semibold" style={{ color: step >= s ? THEME.charcoal : '#777' }}>{k.toLowerCase()}</div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            {step === STEPS.SHIPPING && <ShippingCard />}
            {step === STEPS.PAYMENT && <PaymentCard />}
            {step === STEPS.REVIEW && <ReviewCard />}
          </div>
        </section>

        <aside className="lg:col-span-4">
          <SummaryPanel />
        </aside>
      </main>
    </div>
  );
}