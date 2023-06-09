import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios"
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Link, Navigate, useParams } from "react-router-dom";
import { useSelector } from 'react-redux'

function EditBook() {
  const userRedux = useSelector((state) => state.users.userName);
  const { id } = useParams();
  const [category, setCategory] = useState([]);
  const [state, setState] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    base64image: "",
  });

  useEffect(() => {
    axios
      .get("https://book-e-sell-node-api.vercel.app/api/book/byId?id=" + id)
      .then((response) => {
        const data = {
          name: response.data.result.name,
          price: response.data.result.price,
          description: response.data.result.description,
          categoryId: response.data.result.categoryId,
          base64image: response.data.result.base64image
        };
        setState(data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  const handleFileSelect = async (event) => {
    const file = event?.target?.files[0];
    const reader = new FileReader();
    if (file) {

      // Check if the file type is allowed
      if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
        // Check if the file size is less than 10KB (51,200 bytes)
        if (file.size < 51200) {
          reader.onloadend = () => {
            const base64String = reader.result;
            setState({ ...state, base64image: base64String });
          };
          reader.readAsDataURL(file);
        } else {
          alert("File size must be less than 10KB");
        }
      } else {
        alert("Only JPG, JPEG, and PNG files are allowed");
      }
    }
  };


  useEffect(() => {
    axios
      .get("https://book-e-sell-node-api.vercel.app/api/category/all")
      .then((response) => {
        setCategory(response.data.result);

      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  const handleSubmit = async (e) => {
    const data = {
      "id": id,
      "name": state.name,
      "description": state.description,
      "price": state.price,
      "categoryId": state.categoryId,
      "base64image": state.base64image
    }
    e.preventDefault();
    try {

      const response = await axios.put("https://book-e-sell-node-api.vercel.app/api/book", data);
      if (response.status === 200) {
        console.log('Category Added');
        window.location.replace('/books');
      } else {
        alert("response.response");
        console.log('Unexpected status:', response.status);
      }
    } catch (error) {
      alert(error.response.data.error);
      console.log('Error submitting form:', error.response.data.error);
    }


  };


  if (!userRedux || userRedux === null) {
    return <Navigate to={'/login'} />
  }

  return (
    <>
      <div className='flex flex-col h-screen justify-between'>
        <div>
          <Header />

          <div className='w-8/12 mx-auto text-center text-4xl mt-6 mb-16'>
            <span className='text-gray-700 font-semibold'>Add Book
            </span>
          </div>

          <div className='w-8/12 mx-auto  mt-6 mb-16'>
            <div className="outline-gray-500">
              <form onSubmit={handleSubmit} className="contact-inputs flex flex-col justify-between gap-10 p-3">


                <div className=" flex justify-between">
                  <div className=" w-1/2 flex gap-2 flex-col px-4">
                    <label htmlFor="name" >
                      Book Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      autoComplete="off"
                      className="border"
                      value={state.name}
                      onChange={(e) => setState({ ...state, name: e.target.value })}
                    />
                  </div>
                  <div className=" w-1/2 flex gap-2 flex-col px-4">
                    <label htmlFor="price" >
                      Book Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      required
                      autoComplete="off"
                      className="border"
                      value={state.price}
                      onChange={(e) =>
                        setState({ ...state, price: e.target.value })
                      }
                    />
                  </div>
                </div>


                <div className=" flex justify-between">
                  <div className=" w-1/2 flex gap-2 flex-col px-4">
                    <label htmlFor="category" >
                      Choose Category
                    </label>
                    <select
                      className="border"
                      value={state.categoryId}
                      onChange={(e) =>
                        setState({ ...state, categoryId: e.target.value })
                      }
                    >
                      {/* <option selected disabled hidden></option> */}
                      {category.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {" "}
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className=" w-1/2 flex gap-2 flex-col px-4">
                    <label htmlFor="base64Image" >
                      Upload Image
                    </label>
                    <div className="flex">
                      {state.base64image && (
                        <div>
                          <img src={state.base64image} className="w-10 h-10" alt="book" />
                        </div>
                      )}
                      <input
                        accept="image/jpeg, image/jpg, image/png"
                        className="border justify-center items-center"
                        name="base64image"
                        type="file"
                        onChange={handleFileSelect}
                      />
                    </div>

                  </div>
                </div>


                <div className="flex flex-col px-4">
                  <label htmlFor="description" >
                    Book Description
                  </label>
                  <textarea
                    className="border px-4"
                    rows="4"
                    cols="50"
                    name="description"
                    value={state.description}
                    onChange={(e) =>
                      setState({ ...state, description: e.target.value })
                    }
                  />
                </div>
                <div className='w-full mt-8 mb-20 flex gap-4 px-4' >
                  <button className='bg-green-500  w-32 h-11 rounded-md text-white' type="submit">
                    Save
                  </button>
                  <Link to={'/books'} className='bg-rose-500 w-32 h-11 rounded-md text-white flex items-center justify-center' type="submit">
                    Cancel
                  </Link>
                </div>

              </form>
            </div>
          </div>

        </div>

        <Footer />
      </div>

    </>

  );

}

export default EditBook