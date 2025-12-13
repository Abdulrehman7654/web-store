import React from 'react';
import { Instagram, Linkedin, Facebook, MessageSquare, Mail, Phone, MapPin } from 'lucide-react';

const Footersection = () => {
    // Define mock links and contact details for the footer
    const navigation = {
        main: [
            { name: 'Home', href: '#' },
            { name: 'Collections', href: '#' },
            // Removed 'Bespoke Services' as requested
            { name: 'About Us', href: '#' },
        ],
        legal: [
            { name: 'Terms & Conditions', href: '#' },
            { name: 'Privacy Policy', href: '#' },
            { name: 'Shipping & Returns', href: '#' },
            { name: 'Cookie Settings', href: '#' },
        ],
    };

    const contact = {
        email: 'info@sartrends.com',
        phone: '+1 (555) 123-4567',
        address: '100 Luxury Avenue, New York, NY',
    };

    const socialLinks = [
        { name: 'Facebook', href: 'https://www.facebook.com/sartrends/', icon: Facebook },
        { name: 'Instagram', href: 'https://www.instagram.com/sartrends_official/', icon: Instagram },
        { name: 'LinkedIn', href: 'https://www.linkedin.com/company/sartrends/', icon: Linkedin },
        { name: 'WhatsApp', href: 'https://wa.me/15551234567', icon: MessageSquare },
    ];

    const currentYear = new Date().getFullYear();

    const LinkItem = ({ href, name }) => (
        <li className="mb-2">
            <a href={href} className="text-gray-700 hover:text-amber-700 transition duration-300 font-medium tracking-wider text-sm sm:text-base">
                {name}
            </a>
        </li>
    );

    const ContactItem = ({ Icon, text, linkType }) => (
        <div className="flex items-start space-x-3 mb-2">
            <Icon className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" strokeWidth={1.8} /> {/* Stronger gold icon */}
            {linkType === 'email' ? (
                <a href={`mailto:${text}`} className="text-gray-700 hover:text-amber-700 font-medium text-sm sm:text-base tracking-wide">
                    {text}
                </a>
            ) : linkType === 'phone' ? (
                <a href={`tel:${text}`} className="text-gray-700 hover:text-amber-700 font-medium text-sm sm:text-base tracking-wide">
                    {text}
                </a>
            ) : (
                <p className="text-gray-700 font-light text-sm sm:text-base tracking-wide">{text}</p>
            )}
        </div>
    );

    return (
        // Changed background to pure white and added a subtle shadow and border top for definition
        <footer className="bg-white shadow-xl border-t-4 border-amber-600/20">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                
                {/* Main Content Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
                    
                    {/* Column 1: Branding and Slogan */}
                    <div className="col-span-2 md:col-span-2 space-y-4">
                        {/* Two-tone logo: SAR in luxury charcoal black (text-gray-900), TRENDS in metallic gold (text-amber-700) */}
                        <h3 className="text-5xl font-serif font-extrabold tracking-tighter leading-none">
                            <span className="text-gray-900">SAR</span>
                            <span className="text-amber-600">TRENDS</span>
                        </h3>
                        <p className="text-gray-900 font-light text-base italic tracking-[0.2em]">
                            Excellence in Every Thread
                        </p>
                        <p className="text-gray-600 text-sm pt-4 leading-relaxed border-t border-amber-600/30">
                            A curated selection of the world's most luxurious apparel and bespoke tailoring services.
                        </p>
                    </div>

                    {/* Column 2: Main Navigation */}
                    <div>
                        <h4 className="text-lg font-bold text-gray-900 uppercase mb-5 tracking-widest border-b-2 border-amber-600 pb-1 inline-block">
                            Navigation
                        </h4>
                        <ul className="space-y-3">
                            {navigation.main.map((item) => (
                                <LinkItem key={item.name} href={item.href} name={item.name} />
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Legal & Information */}
                    <div>
                        <h4 className="text-lg font-bold text-gray-900 uppercase mb-5 tracking-widest border-b-2 border-amber-600 pb-1 inline-block">
                            Information
                        </h4>
                        <ul className="space-y-3">
                            {navigation.legal.map((item) => (
                                <LinkItem key={item.name} href={item.href} name={item.name} />
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Contact Details */}
                    <div className="col-span-2 md:col-span-1">
                        <h4 className="text-lg font-bold text-gray-900 uppercase mb-5 tracking-widest border-b-2 border-amber-600 pb-1 inline-block">
                            Headquarters
                        </h4>
                        <div className="space-y-4">
                            <ContactItem Icon={Mail} text={contact.email} linkType="email" />
                            <ContactItem Icon={Phone} text={contact.phone} linkType="phone" />
                            <ContactItem Icon={MapPin} text={contact.address} linkType="text" />
                        </div>
                    </div>
                </div>

                {/* Separator and Social Media/Copyright Section */}
                <div className="mt-16 pt-8 border-t border-amber-600/30 flex flex-col sm:flex-row items-center justify-between">
                    
                    {/* Copyright */}
                    <p className="text-base text-gray-700 font-light tracking-wide order-1 sm:order-1 mb-4 sm:mb-0">
                        &copy; {currentYear} Sartrends Ltd. All rights reserved. | Crafted for Luxury.
                    </p>

                    {/* Social Icons */}
                    <div className="flex space-x-6 order-2 sm:order-2">
                        {socialLinks.map((item) => (
                            <a 
                                key={item.name} 
                                href={item.href} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-gray-600 hover:text-amber-700 transition duration-300 transform hover:scale-110"
                                aria-label={`Follow us on ${item.name}`}
                            >
                                <item.icon className="h-7 w-7" strokeWidth={1.8} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footersection;