import axios from "axios";
import React, { useEffect, useState } from "react";

function Product() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // [
  const [id, setId] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    axios.get("https://northwind.vercel.app/api/products").then((result) => {
      setProducts(result.data);
    });
    //});
  };

  const updateData = async () => {
    axios.put(
      `https://northwind.vercel.app/api/products/${id}`,
      selectedProduct
    );
    loadData();
    alert("Data Updated");
  };

  const fillInputArea = (id) => {
    const data = products.find((item) => item.id === id);
    setSelectedProduct(data);
  };

  return (
    <div>
      <h1 className="title">Product</h1>

      <table className="table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Unit Price</th>
            <th>Units In Stock</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((item) => (
              <tr
                key={item.id}
                onClick={() => fillInputArea(item.id)}
                className="table-row"
              >
                <td>{item.name}</td>
                <td>{item.unitPrice}</td>
                <td>{item.unitsInStock}</td>
              </tr>
            ))}
        </tbody>
      </table>

      {selectedProduct && (
        <div className="inputArea">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            value={selectedProduct.name}
            onChange={(e) =>
              setSelectedProduct((prevProduct) => ({
                ...prevProduct,
                name: e.target.value,
              }))
            }
            className="input"
          />
          <label htmlFor="unitPrice">Unit Price</label>
          <input
            type="text"
            id="unitPrice"
            value={selectedProduct.unitPrice}
            onChange={(e) =>
              setSelectedProduct((prevProduct) => ({
                ...prevProduct,
                unitPrice: e.target.value,
              }))
            }
            className="input"
          />

          <label htmlFor="unitsInStock">Units In Stock</label>
          <input
            type="text"
            id="unitsInStock"
            value={selectedProduct.unitsInStock}
            onChange={(e) =>
              setSelectedProduct((prevProduct) => ({
                ...prevProduct,
                unitsInStock: e.target.value,
              }))
            }
            className="input"
          />
          <button className="btn btn-update" onClick={() => updateData()}>
            Update
          </button>
        </div>
      )}
    </div>
  );
}

export default Product;
