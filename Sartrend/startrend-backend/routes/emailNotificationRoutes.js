// Backend: routes/orderRoutes.js or in your orders API file
// Add this route to handle email notifications

const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email service
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASSWORD // Your email password or app password
  }
});

// Route to send order email
router.post('/orders/send-email', async (req, res) => {
  try {
    const {
      orderId,
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      totalAmount,
      items,
      adminEmail
    } = req.body;

    // Create email content
    const itemsList = items.map(item => {
      if (Array.isArray(item.products) && item.products.length) {
        const productNames = item.products.map(p => `  - ${p.name}`).join('\n');
        return `${item.name} (Qty: ${item.quantity})\n${productNames}`;
      }
      return `${item.name} (Qty: ${item.quantity})`;
    }).join('\n');

    const emailContent = `
New Order Received - SAR TREND
================================

Order ID: ${orderId}
Order Date: ${new Date().toLocaleString()}

CUSTOMER INFORMATION
--------------------
Name: ${customerName}
Email: ${customerEmail}
Phone: ${customerPhone}
Address: ${customerAddress}

ORDER ITEMS
-----------
${itemsList}

PAYMENT DETAILS
---------------
Total Amount: ${totalAmount}
Payment Method: Cash on Delivery (COD)
Payment Status: Pending

Order Status: Pending

================================
This is an automated notification from SAR TREND e-commerce system.
    `.trim();

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: adminEmail,
      subject: `New Order #${orderId} - SAR TREND`,
      text: emailContent,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #B8860B; border-bottom: 2px solid #B8860B; padding-bottom: 10px;">
            New Order Received - SAR TREND
          </h2>
          
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Order ID:</strong> ${orderId}</p>
            <p><strong>Order Date:</strong> ${new Date().toLocaleString()}</p>
          </div>

          <h3 style="color: #111827;">Customer Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${customerName}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${customerEmail}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${customerPhone}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Address:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${customerAddress}</td>
            </tr>
          </table>

          <h3 style="color: #111827; margin-top: 30px;">Order Items</h3>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
            <pre style="white-space: pre-wrap; font-family: monospace;">${itemsList}</pre>
          </div>

          <h3 style="color: #111827; margin-top: 30px;">Payment Details</h3>
          <div style="background: #fff3cd; padding: 15px; border-radius: 5px; border-left: 4px solid #B8860B;">
            <p style="margin: 5px 0;"><strong>Total Amount:</strong> <span style="color: #B8860B; font-size: 18px;">${totalAmount}</span></p>
            <p style="margin: 5px 0;"><strong>Payment Method:</strong> Cash on Delivery (COD)</p>
            <p style="margin: 5px 0;"><strong>Payment Status:</strong> Pending</p>
            <p style="margin: 5px 0;"><strong>Order Status:</strong> Pending</p>
          </div>

          <div style="margin-top: 30px; padding: 15px; background: #f0f0f0; border-radius: 5px; text-align: center; color: #666;">
            <p style="margin: 0; font-size: 12px;">This is an automated notification from SAR TREND e-commerce system.</p>
          </div>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully' 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send email',
      error: error.message 
    });
  }
});

module.exports = router;

// ============================================
// ENVIRONMENT VARIABLES (.env file)
// ============================================
// Add these to your .env file:
// EMAIL_USER=your-email@gmail.com
// EMAIL_PASSWORD=your-app-password

// ============================================
// INSTALLATION
// ============================================
// Install nodemailer if not already installed:
// npm install nodemailer

// ============================================
// SETUP IN YOUR MAIN SERVER FILE
// ============================================