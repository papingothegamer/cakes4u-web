import { createClient } from '@supabase/supabase-js';
import emailjs from '@emailjs/browser';

// Initialize Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and Key must be defined in environment variables.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

interface CustomOrderData {
  occasion: string;
  size: string;
  flavor: string;
  details: string;
  required_date: string;
  userEmail: string;
  customerName: string;
}

// Send an email to the business using EmailJS
const sendEmailToBusiness = async (orderData: CustomOrderData, orderId: string) => {
  try {
    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_BUSINESS_TEMPLATE_ID,
      {
        order_id: orderId,
        customer_name: orderData.customerName,
        customer_email: orderData.userEmail,
        occasion: orderData.occasion,
        flavor: orderData.flavor,
        size: orderData.size,
        required_date: orderData.required_date,
        details: orderData.details,
      }
    );
    console.log('Email sent to business.', response);
  } catch (error) {
    const err = error as Error;
    console.error('Failed to send email to business:', err.message);
  }
};

// Send a confirmation email to the customer
const sendEmailToCustomer = async (orderData: CustomOrderData, orderId: string, orderStatus: string) => {
  try {
    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_CUSTOMER_TEMPLATE_ID,
      {
        order_id: orderId,
        customer_name: orderData.customerName,
        occasion: orderData.occasion,
        flavor: orderData.flavor,
        size: orderData.size,
        required_date: orderData.required_date,
        order_status: orderStatus,
      }
    );
    console.log('Confirmation email sent to customer.', response);
  } catch (error) {
    const err = error as Error;
    console.error('Failed to send email to customer:', err.message);
  }
};

// Place the custom order into Supabase and send notifications
export const placeCustomOrder = async (orderData: CustomOrderData, userId: string) => {
  try {
    // Save the order into Supabase
    const { data, error } = await supabase
      .from('custom_orders')
      .insert([
        {
          user_id: userId,
          occasion: orderData.occasion,
          size: orderData.size,
          flavor: orderData.flavor,
          details: orderData.details,
          required_date: orderData.required_date,
          order_status: 'Pending', // Initial status
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) throw new Error(error.message);

    if (data && data.length > 0) {
      const orderId = data[0].id;

      // Send notification emails
      await sendEmailToBusiness(orderData, orderId);
      await sendEmailToCustomer(orderData, orderId, 'Pending'); // Initial status

      return { success: true, order: data[0] };
    }

    throw new Error('Order creation failed. No data returned.');
  } catch (error) {
    const err = error as Error;
    console.error('Error placing custom order:', err.message);
    return { success: false, message: err.message };
  }
};

// Update the order status in the database
export const updateOrderStatus = async (orderId: string, newStatus: string) => {
  try {
    const { data, error } = await supabase
      .from('custom_orders')
      .update({ order_status: newStatus })
      .match({ id: orderId });

    if (error) throw new Error(error.message);

    return { success: true, updatedOrder: data };
  } catch (error) {
    const err = error as Error;
    console.error('Error updating order status:', err.message);
    return { success: false, message: err.message };
  }
};
