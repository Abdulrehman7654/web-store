// src/admin/Products.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from './productApi';
import ProductForm from './ProductForm';

const ITEMS_PER_PAGE = 15;

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [fetchingProduct, setFetchingProduct] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const list = await api.getAllProducts();
      // console.log('Loaded products:', list);
      setProducts(list);
    } catch (error) {
      console.error('Error loading products:', error);
      alert('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleUpdate(id, data) {
    setSaving(true);
    try {
      const updated = await api.updateProduct(id, data);
      
      setProducts((prevProducts) => 
        prevProducts.map((product) => 
          String(product.id) === String(id) ? updated : product
        )
      );
      
      setShowEditModal(false);
      setEditing(null);
      alert('Product updated successfully!');
      
      // Reload the list to ensure we have the latest data
      await load();
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    // console.log('Deleting product:', id);
    
    try {
      await api.deleteProduct(id);
      setProducts((p) => p.filter((it) => String(it.id) !== String(id)));
      setShowDeleteConfirm(false);
      setProductToDelete(null);
      // setSelectedProduct(null);
      
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
      setShowDeleteConfirm(false);
      setProductToDelete(null);
    }
  }

  const openDeleteConfirm = (product) => {
    setProductToDelete(product);
    setShowDeleteConfirm(true);
  };

  const openEditModal = async (product) => {
    setShowEditModal(true);
    setFetchingProduct(true);
    setEditing(null);
    // console.log('product', product);
    
    try {
      // console.log('Fetching product data for ID:', product.id);
      const freshProductData = await api.getProductById(product.id);
      // console.log('Fetched product data:', freshProductData);
      
      // Set the editing state with the fresh data
      setEditing(freshProductData);
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Failed to load product data. Please try again.');
      setShowEditModal(false);
    } finally {
      setFetchingProduct(false);
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = products.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisible = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    buttons.push(
      <button
        key="prev"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
      >
        Previous
      </button>
    );

    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          onClick={() => goToPage(1)}
          className="px-3 py-2 border rounded hover:bg-gray-50"
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(<span key="dots1" className="px-2">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`px-3 py-2 border rounded ${
            currentPage === i 
              ? 'bg-black text-white' 
              : 'hover:bg-gray-50'
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(<span key="dots2" className="px-2">...</span>);
      }
      buttons.push(
        <button
          key={totalPages}
          onClick={() => goToPage(totalPages)}
          className="px-3 py-2 border rounded hover:bg-gray-50"
        >
          {totalPages}
        </button>
      );
    }

    buttons.push(
      <button
        key="next"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
      >
        Next
      </button>
    );

    return buttons;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Products</h3>
          <p className="text-sm text-gray-500">
            Showing {startIndex + 1}-{Math.min(endIndex, products.length)} of {products.length} products
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/admin/new-product')} 
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
          >
            Add Product
          </button>
          <button onClick={load} className="px-3 py-2 border rounded hover:bg-gray-50">Refresh</button>
        </div>
      </div>

      <div className="bg-white shadow-sm border rounded">
        <table className="w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3">Rate</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="p-6 text-center">Loading…</td></tr>
            ) : currentProducts.length === 0 ? (
              <tr><td colSpan="5" className="p-6 text-center">No products</td></tr>
            ) : currentProducts.map((p) => (
              <tr key={p.id} className="border-t hover:bg-gray-50">
                <td className="p-3 flex items-center gap-3">
                  {p.imageUrl ? <img src={p.imageUrl} alt={p.name} className="w-14 h-14 object-cover rounded" /> : <div className="w-14 h-14 bg-gray-100 rounded" />}
                  <div>
                    <div className="font-medium">{p.name}</div>
                    <div className="text-sm text-gray-500">{String(p.description || '').slice(0, 80)}</div>
                  </div>
                </td>
                <td className="p-3 text-sm">{p.category}</td>
                <td className="p-3 text-center">{String(p.rate*290)}</td>
                <td className="p-3 text-center">{p.stock ?? '-'}</td>
                <td className="p-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button 
                      className="px-3 py-1 border rounded text-sm hover:bg-blue-50 hover:text-blue-600 transition-colors" 
                      onClick={() => setSelectedProduct(p)}
                    >
                      View
                    </button>
                    {/* <button 
                      className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors" 
                      onClick={() => openEditModal(p)}
                    >
                      Edit
                    </button> */}
                    <button 
                      className="px-3 py-1 border rounded text-sm hover:bg-red-50 hover:text-red-600 transition-colors" 
                      onClick={() => openDeleteConfirm(p)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!loading && products.length > ITEMS_PER_PAGE && (
          <div className="border-t p-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center gap-2">
              {renderPaginationButtons()}
            </div>
          </div>
        )}
      </div>

      {/* Edit Product Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold">
                {fetchingProduct ? 'Loading Product...' : `Edit Product — ${editing?.name || ''}`}
              </h3>
              <button 
                onClick={() => {
                  setShowEditModal(false);
                  setEditing(null);
                }}
                className="text-gray-500 hover:text-gray-700 text-2xl"
                disabled={saving || fetchingProduct}
              >
                ×
              </button>
            </div>

            <div className="p-6">
              {fetchingProduct ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                  <p className="text-gray-600">Loading product data...</p>
                </div>
              ) : editing ? (
                <ProductForm
                  productId={editing.id}
                  initial={editing}
                  onCancel={() => {
                    setShowEditModal(false);
                    setEditing(null);
                  }}
                  onSave={(data) => handleUpdate(editing.id, data)}
                  saving={saving}
                />
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Failed to load product data
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* View Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold">Product Details</h3>
              <button 
                onClick={() => setSelectedProduct(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              {selectedProduct.imageUrl && (
                <div className="flex justify-center">
                  <img 
                    src={selectedProduct.imageUrl} 
                    alt={selectedProduct.name} 
                    className="max-w-md w-full h-auto rounded-lg shadow-md object-cover"
                  />
                </div>
              )}

              <div>
                <h4 className="text-2xl font-bold mb-2">{selectedProduct.name}</h4>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="px-3 py-1 bg-gray-100 rounded-full">{selectedProduct.category}</span>
                  <span>ID: {selectedProduct.id}</span>
                </div>
              </div>

              {selectedProduct.description && (
                <div className="border-t pt-4">
                  <h5 className="font-semibold mb-2 text-gray-700">Description</h5>
                  <p className="text-gray-600 whitespace-pre-wrap">{selectedProduct.description}</p>
                </div>
              )}

              <div className="border-t pt-4 grid grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold mb-2 text-gray-700">Price</h5>
                  <p className="text-2xl font-bold text-green-600">PKR {selectedProduct.rate*290}</p>
                </div>
                <div>
                  <h5 className="font-semibold mb-2 text-gray-700">Stock</h5>
                  <p className="text-2xl font-bold text-blue-600">{selectedProduct.stock ?? 'N/A'}</p>
                </div>
              </div>

              {(selectedProduct.brand || selectedProduct.model || selectedProduct.color) && (
                <div className="border-t pt-4">
                  <h5 className="font-semibold mb-3 text-gray-700">Additional Information</h5>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedProduct.brand && (
                      <div>
                        <span className="text-sm text-gray-500">Brand:</span>
                        <p className="font-medium">{selectedProduct.brand}</p>
                      </div>
                    )}
                    {selectedProduct.model && (
                      <div>
                        <span className="text-sm text-gray-500">Model:</span>
                        <p className="font-medium">{selectedProduct.model}</p>
                      </div>
                    )}
                    {selectedProduct.color && (
                      <div>
                        <span className="text-sm text-gray-500">Color:</span>
                        <p className="font-medium">{selectedProduct.color}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="border-t pt-4 flex justify-between gap-3">
                <button
                  onClick={() => {
                    const productToEdit = selectedProduct;
                    setSelectedProduct(null);
                    openEditModal(productToEdit);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Edit Product
                </button>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      openDeleteConfirm(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                  >
                    Delete Product
                  </button>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="px-4 py-2 border rounded hover:bg-gray-50"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && productToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[60]">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
                <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              
              <h3 className="text-lg font-bold text-center mb-2">Delete Product?</h3>
              <p className="text-gray-600 text-center mb-2">
                Are you sure you want to delete <span className="font-semibold">{productToDelete.name}</span>?
              </p>
              <p className="text-sm text-gray-500 text-center mb-6">
                This action cannot be undone. The product will be permanently removed from the system.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setProductToDelete(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(productToDelete.id)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}