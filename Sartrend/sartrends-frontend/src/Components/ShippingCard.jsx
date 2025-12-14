import { Field } from "../pages/CheckoutPage"

const THEME = {
  charcoal: '#111827',
  gold: '#B8860B',
  goldAccent: '#E6B857',
  bg: '#F7F7F7',
  success: '#AA8C42',
  muted: '#6B7280',
  paneBlack: '#0b0b0b'
};


const IconPhone = ({ className = 'w-7 h-7' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M21 16.5v3a1 1 0 01-1.1 1 19.91 19.91 0 01-8.8-3.2 19.91 19.91 0 01-6.4-6.4A19.91 19.91 0 013.5 4.1 1 1 0 014.5 3h3a1 1 0 01.9.6l1.2 3a1 1 0 01-.2 1L8.4 9.9a12.1 12.1 0 005 5l1.7-1.9a1 1 0 011-.2l3 1.2a1 1 0 01.6.9z" stroke={THEME.gold} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ShippingCard = ({form, onChange, errors, steps, setStep, validateShipping}) => {
    return(
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
                setStep(steps.PAYMENT);
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
    )
}

export default ShippingCard