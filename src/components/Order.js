import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

function Order() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    axios.get("https://northwind.vercel.app/api/orders").then((result) => {
      setOrders(result.data);
      console.log("Order rendered", result.data);
    });
  };

  const deleteData = async (id) => {
    axios.delete(`https://northwind.vercel.app/api/orders/${id}`).then(() => {
      alert("Data Deleted: ", id);
      loadData();
    });
  };

  return (
    <div>
      <div>
        <h1 className="title">Order</h1>

        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Ship Name</th>
              <th>Ship Via</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.shipName}</td>
                  <td>{item.shipVia}</td>
                  <td>
                    <button
                      className="btn deleteBtn"
                      onClick={(e) => {
                        e.preventDefault();
                        deleteData(item.id);
                      }}
                    >
                      &times;
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Order;
