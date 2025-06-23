import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getProduct, updateProduct } from '../services/api';

const categoryOptions = ['ELECTRONICS', 'CLOTHING', 'FOOD', 'BOOKS'];

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const data = await getProduct(id, token);
      setForm({
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category
      });
    } catch (err) {
      setError('❌ Failed to fetch product.');
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(id, form, token);
      setSuccess('✅ Product updated successfully!');
      setTimeout(() => navigate('/products'), 1500);
    } catch (err) {
      setError('❌ Update failed.');
      console.error(err);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Edit Product</h2>

      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            name="name"
            className="form-control"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            placeholder="Description"
            rows="3"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            name="price"
            type="number"
            className="form-control"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Category</label>
          <select
            name="category"
            className="form-select"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          >
            <option value="">Select Category</option>
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">Update Product</button>
      </form>
    </div>
  );
}
