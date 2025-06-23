import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getProductsByUser, deleteProduct } from '../services/api';
import { Link } from 'react-router-dom';

export default function Products() {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      if (!token) return;
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.jti;
      const data = await getProductsByUser(userId, token);
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id, token);
      fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err.message);
    }
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">
          <i className="bi bi-box-seam me-2"></i>My Products
        </h2>
        <Link to="/add-product" className="btn btn-primary">
          <i className="bi bi-plus-circle me-1"></i>Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="alert alert-info text-center">
          <h5><i className="bi bi-info-circle me-2"></i>No products found</h5>
          <p>You haven’t added any products yet.</p>
        </div>
      ) : (
        <div className="row">
          {products.map((p) => (
            <div className="col-md-6 col-lg-4 mb-4" key={p.id}>
              <div className="card h-100 shadow-sm border-0 hover-shadow">
                <div className="card-body">
                  <h5 className="card-title text-capitalize">{p.name}</h5>
                  <p className="card-text text-muted text-truncate" title={p.description}>
                    {p.description}
                  </p>
                  <p className="mb-2"><strong>Price:</strong> ${p.price}</p>
                  <span className="badge bg-dark text-uppercase">{p.category}</span>
                </div>
                <div className="card-footer bg-transparent border-top-0 d-flex justify-content-between">
                  <Link to={`/edit-product/${p.id}`} className="btn btn-sm btn-outline-primary">
                    <i className="bi bi-pencil-square me-1"></i>
                  </Link>
                  <button onClick={() => handleDelete(p.id)} className="btn btn-sm btn-outline-danger">
                    <i className="bi bi-trash me-1"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
