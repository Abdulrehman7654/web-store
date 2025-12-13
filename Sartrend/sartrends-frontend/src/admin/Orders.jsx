// src/admin/Orders.jsx
import React, { useEffect, useState } from 'react';

const ITEMS_PER_PAGE = 15;

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  async function loadOrders() {
    setLoading(true);
    try {
      const response = await fetch('/api/orders');
      if (!response.ok) throw new Error('Failed to fetch orders');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error loading orders:', error);
      alert('Failed to load orders');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  async function updateOrderStatus(orderId, newStatus) {
    try {
      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderStatus: newStatus })
      });
      
      if (!response.ok) throw new Error('Failed to update status');
      
      const updated = await response.json();
      setOrders((prev) => 
        prev.map((o) => (o._id === orderId ? { ...o, orderStatus: newStatus } : o))
      );
      
      if (selectedOrder?._id === orderId) {
        setSelectedOrder({ ...selectedOrder, orderStatus: newStatus });
      }
      
      alert('Order status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update order status');
    }
  }

  async function deleteOrder(orderId) {
    // console.log('Confirming delete for order:', orderId);
    
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: 'DELETE'
      });
      
      // console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to delete order');
      }
      
      // Remove from state
      setOrders((prev) => prev.filter((o) => o._id !== orderId));
      setSelectedOrder(null);
      setShowDeleteConfirm(false);
      setOrderToDelete(null);
      
      // console.log('Order deleted successfully');
      alert('Order deleted successfully!');
    } catch (error) {
      console.error('Error deleting order:', error);
      alert(`Failed to delete order: ${error.message}`);
      setShowDeleteConfirm(false);
      setOrderToDelete(null);
    }
  }

  const openDeleteConfirm = (order) => {
    setOrderToDelete(order);
    setShowDeleteConfirm(true);
  };

  // Filter orders by status
  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter(o => o.orderStatus === statusFilter);

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0
    }).format(amount).replace('PKR', 'Rs');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Orders</h3>
          <p className="text-sm text-gray-500">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredOrders.length)} of {filteredOrders.length} orders
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 border rounded"
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button onClick={loadOrders} className="px-3 py-2 border rounded hover:bg-gray-50">
            Refresh
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm border rounded">
        <table className="w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-center">Total</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Payment</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" className="p-6 text-center">Loading orders…</td></tr>
            ) : currentOrders.length === 0 ? (
              <tr><td colSpan="7" className="p-6 text-center">No orders found</td></tr>
            ) : currentOrders.map((order) => (
              <tr key={order._id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <div className="font-mono text-sm font-medium">
                    #{order._id.slice(-8)}
                  </div>
                </td>
                <td className="p-3">
                  <div className="font-medium">{order.customerName}</div>
                  <div className="text-sm text-gray-500">{order.customerPhone}</div>
                </td>
                <td className="p-3 text-sm text-gray-600">
                  {formatDate(order.createdAt)}
                </td>
                <td className="p-3 text-center font-semibold">
                  {formatCurrency(order.totalAmount)}
                </td>
                <td className="p-3 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)}`}>
                    {order.orderStatus}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                  }`}>
                    {order.paymentMethod} - {order.paymentStatus}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <button 
                    onClick={() => setSelectedOrder(order)}
                    className="px-2 py-1 border rounded text-sm hover:bg-gray-50"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {!loading && filteredOrders.length > ITEMS_PER_PAGE && (
          <div className="border-t p-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              <span className="px-3 py-2">{currentPage} / {totalPages}</span>
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-xl font-bold">Order Details</h3>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Order Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Order ID</div>
                  <div className="font-mono font-medium">#{selectedOrder._id}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Date</div>
                  <div className="font-medium">{formatDate(selectedOrder.createdAt)}</div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">Customer Information</h4>
                <div className="space-y-2">
                  <div><span className="text-gray-500">Name:</span> {selectedOrder.customerName}</div>
                  <div><span className="text-gray-500">Email:</span> {selectedOrder.customerEmail || 'N/A'}</div>
                  <div><span className="text-gray-500">Phone:</span> {selectedOrder.customerPhone}</div>
                  <div><span className="text-gray-500">Address:</span> {selectedOrder.customerAddress}</div>
                </div>
              </div>

              {/* Products */}
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">Order Items</h4>
                <div className="space-y-2">
                  {selectedOrder.products.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <div className="font-medium">Product ID: {item.productId}</div>
                        <div className="text-sm text-gray-500">Quantity: {item.quantity}</div>
                      </div>
                      <div className="font-semibold">{formatCurrency(item.price)}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment & Status */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="text-sm text-gray-500">Payment Method</div>
                    <div className="font-medium">{selectedOrder.paymentMethod}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Total Amount</div>
                    <div className="text-2xl font-bold text-yellow-600">
                      {formatCurrency(selectedOrder.totalAmount)}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="text-sm text-gray-500 block mb-2">Order Status</label>
                    <select
                      value={selectedOrder.orderStatus}
                      onChange={(e) => updateOrderStatus(selectedOrder._id, e.target.value)}
                      className="w-full px-3 py-2 border rounded"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t pt-4 flex justify-between">
                <button
                  onClick={() => openDeleteConfirm(selectedOrder)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Delete Order
                </button>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 border rounded hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && orderToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[60]">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
                <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              
              <h3 className="text-lg font-bold text-center mb-2">Delete Order?</h3>
              <p className="text-gray-600 text-center mb-4">
                Are you sure you want to delete order <span className="font-mono font-semibold">#{orderToDelete._id.slice(-8)}</span>?
              </p>
              <p className="text-sm text-gray-500 text-center mb-6">
                This action cannot be undone. The order will be permanently removed from the system.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setOrderToDelete(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteOrder(orderToDelete._id)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Delete Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}