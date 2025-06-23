import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { createProduct } from '../services/api';

const categoryOptions = ['ELECTRONICS', 'CLOTHING', 'FOOD', 'BOOKS'];

export default function AddProduct() {
  const { token, user } = useAuth();
  const [form, setForm] = useState({ name: '', description: '', price: '', category: '' });
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const payload = { ...form, createdById: user.id };
      await createProduct(payload, token);
      setForm({ name: '', description: '', price: '', category: '' });
      setSuccess('✅ Product added successfully!');
    } catch (err) {
      console.error(err);
      setError('❌ Failed to add product.');
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Add Product</h2>

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

        <button type="submit" className="btn btn-primary w-100">Create Product</button>
      </form>
    </div>
  );
}