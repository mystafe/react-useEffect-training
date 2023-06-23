import React, { useEffect, useState } from "react";
import axios from "axios";

function Category() {
  const [categories, setCategories] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [selectedCategory, setselectedCategory] = useState(null); // [

  useEffect(() => {
    loadData();
  }, [categories]);
  const loadData = async () => {
    axios.get("https://northwind.vercel.app/api/categories").then((result) => {
      setCategories(result.data);
    });
  };
  const addData = async () => {
    const data = {
      name,
      description,
    };

    axios
      .post("https://northwind.vercel.app/api/categories", data)
      .then((result) => {
        console.log(result.data);
      });

    setName("");
    setDescription("");
    loadData();
  };

  const updateCategory = async (id) => {
    axios.put(
      `https://northwind.vercel.app/api/categories/${id}`,
      selectedCategory
    );
    loadData();
    setselectedCategory(null);
    alert("Data Updated");
  };

  return (
    <div>
      <h1 className="title">Category</h1>

      <div className="inputArea">
        <label htmlFor="name">Category Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input"
        />
        <button className="btn btn-add" onClick={() => addData()}>
          Add
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {categories &&
            categories.map((item) => (
              <tr key={item.id} onClick={() => setselectedCategory(item)}>
                <td>{item.name}</td>
                <td>{item.description}</td>
              </tr>
            ))}
        </tbody>
      </table>

      {selectedCategory && (
        <div className="inputArea">
          <label htmlFor="name">Category Name</label>
          <input
            type="text"
            id="name"
            value={selectedCategory.name}
            onChange={(e) =>
              setselectedCategory((prevCategory) => ({
                ...prevCategory,
                name: e.target.value,
              }))
            }
            className="input"
          />
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            value={selectedCategory.description}
            onChange={(e) =>
              setselectedCategory((prevCategory) => ({
                ...prevCategory,
                description: e.target.value,
              }))
            }
            className="input"
          />
          <button
            className="btn btn-update"
            onClick={() => {
              updateCategory(selectedCategory.id);
            }}
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
}
export default Category;
