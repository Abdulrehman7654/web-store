import React from 'react';
import { Instagram, Linkedin, Facebook, MessageSquare, Mail, Phone } from 'lucide-react';

// Custom Gold and Black Tailwind classes for a luxury feel
// Primary: Black (text-gray-900)
// Accent: Metallic Gold (simulated using text-amber-600/700 and hover effects)
// Background: White (bg-white)

// Component to inject necessary CSS keyframes for the shimmering text effect
const ShimmerStyle = () => (
    <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
            /* Start position (off-screen left) */
            0% { background-position: -1000px 0; }
            /* End position (off-screen right) */
            100% { background-position: 1000px 0; }
        }
        /* The custom class for the luxury metallic shimmer effect */
        .text-shimmer {
            /* Linear gradient from black/dark grey to bright gold, simulating metal */
            background: linear-gradient(90deg, #333 0%, #a3895e 20%, #e0c897 50%, #a3895e 80%, #333 100%);
            /* Clip the background to the shape of the text */
            -webkit-background-clip: text;
            background-clip: text;
            /* Make the text color transparent so only the background gradient shows */
            color: transparent;
            /* Ensure the background gradient is wide enough to move across the text */
            background-size: 200% auto;
            /* Apply the animation: 5s duration, infinite loop, smooth linear movement */
            animation: shimmer 5s infinite linear;
        }
    `}} />
);

const SartrendsContact = () => {
  // Use mock/placeholder links. Replace 'YOUR_...' with active, working links.
  const contactInfo = {
    email: 'info@sartrends.com',
    phone: '+1 (555) 123-4567',
    address: '100 Luxury Avenue, New York, NY 10001',
    instagram: 'https://www.instagram.com/sartrends_official/',
    linkedin: 'https://www.linkedin.com/company/sartrends/',
    facebook: 'https://www.facebook.com/sartrends/',
    whatsapp: 'https://wa.me/15551234567', // Link format for WhatsApp
  };

  const SocialLink = ({ href, Icon, name }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-3 text-gray-900 hover:text-amber-700 transition duration-300 transform hover:scale-105 group"
      aria-label={`Follow us on ${name}`}
    >
      <Icon className="w-6 h-6 text-amber-600 group-hover:text-amber-700" strokeWidth={1.5} />
      <span className="text-lg font-light tracking-wider group-hover:underline">{name}</span>
    </a>
  );

  const InfoItem = ({ Icon, text, type = 'text' }) => (
    <div className="flex items-center space-x-4 text-gray-800">
      <Icon className="w-5 h-5 text-amber-600 flex-shrink-0" strokeWidth={1.5} />
      {type === 'email' ? (
        <a href={`mailto:${text}`} className="font-light hover:text-amber-700 transition duration-300">
          {text}
        </a>
      ) : type === 'phone' ? (
        <a href={`tel:${text}`} className="font-light hover:text-amber-700 transition duration-300">
          {text}
        </a>
      ) : (
        <span className="font-light">{text}</span>
      )}
    </div>
  );

  return (
    // Outer container with a plain white background
    <div className="min-h-screen bg-white py-16 sm:py-24">
      {/* Inject the custom CSS animation styles here */}
      <ShimmerStyle /> 
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header - Professional Typography */}
        <div className="text-center mb-16">
          <p className="text-amber-700 text-sm uppercase tracking-[0.4em] font-semibold mb-2">Connect & Consult</p>
          {/* SARTRENDS Title with the new Shimmer Animation */}
          <h1 className="text-5xl sm:text-7xl font-serif font-extrabold tracking-tight leading-tight text-shimmer">
            SARTRENDS
          </h1>
          <h2 className="text-2xl sm:text-3xl text-gray-800 font-light mt-4 tracking-wider">
            Excellence in Every Interaction.
          </h2>
        </div>

        {/* Contact Grid Layout */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24">

          {/* Left Column: Contact Form Placeholder or Direct Info */}
          <div className="p-8 rounded-xl shadow-2xl bg-gray-50/70 border border-amber-500/30">
            <h3 className="text-3xl font-serif font-bold mb-6 text-gray-900 border-b-2 border-amber-600 pb-2 inline-block">
              Get In Touch
            </h3>
            <p className="text-gray-700 mb-8 font-light leading-relaxed">
              We welcome the opportunity to discuss your bespoke needs. Contact us directly via email or telephone, or visit our headquarters.
            </p>

            <div className="space-y-6 text-lg">
              <InfoItem Icon={Mail} text={contactInfo.email} type="email" />
              <InfoItem Icon={Phone} text={contactInfo.phone} type="phone" />
              <InfoItem Icon={MessageSquare} text="Instant WhatsApp Messaging" />
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm uppercase tracking-wider text-amber-700 mb-2">Global Headquarters</p>
                <InfoItem Icon={Mail} text={contactInfo.address} />
              </div>
            </div>
          </div>

          {/* Right Column: Social & Digital Presence */}
          <div className="p-8 rounded-xl shadow-2xl bg-gray-50/70 border border-amber-500/30">
            <h3 className="text-3xl font-serif font-bold mb-6 text-gray-900 border-b-2 border-amber-600 pb-2 inline-block">
              Our Digital Presence
            </h3>
            <p className="text-gray-700 mb-8 font-light leading-relaxed">
              Follow our latest trends and exclusive behind-the-scenes content on our premium social channels.
            </p>

            <div className="space-y-8">
              {/* Instagram Link */}
              <SocialLink href={contactInfo.instagram} Icon={Instagram} name="Instagram" />
              
              {/* WhatsApp Link */}
              <SocialLink href={contactInfo.whatsapp} Icon={MessageSquare} name="WhatsApp (Instant Chat)" />

              {/* LinkedIn Link */}
              <SocialLink href={contactInfo.linkedin} Icon={Linkedin} name="LinkedIn" />
              
              {/* Facebook Link */}
              <SocialLink href={contactInfo.facebook} Icon={Facebook} name="Facebook" />
            </div>
          </div>

        </div>
        
        {/* Footer/Slogan */}
        <div className="mt-24 text-center">
            <p className="text-xl italic font-serif text-gray-600 tracking-wider">
                "Where Vision Meets Craftsmanship."
            </p>
        </div>

      </div>
    </div>
  );
};

export default SartrendsContact;