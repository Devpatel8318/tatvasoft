import React, { useEffect, useState, useRef, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Button } from "../../styles/Button";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { withSwal } from 'react-sweetalert2';


function User({ swal }) {
  const { user } = useContext(UserContext);
  const y = user;
  const [users, setUsers] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const currentPage = useRef();
  const [rows, setRows] = useState([5]);
  const [value, setValue] = useState(0);

  const rerender = () => {
    currentPage.current = 2;
    setValue(1 - value);
  };

  const Rows = [5, 10, 20],
    MakeItem = function (X) {
      return <option key={X}>{X}</option>;
    };

  const renderOptions = () => {
    return Rows.map((row) => MakeItem(row));
  };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setRows(selectedValue);
  };

  useEffect(() => {
    currentPage.current = 1;
    if (rows) {
      getPaginatedUsers();
    }
  }, [rows, value]);


  function handlePageClick(e) {
    currentPage.current = e.selected + 1;
    getPaginatedUsers();
  }

  function getPaginatedUsers() {
    axios
      .get(
        `https://book-e-sell-node-api.vercel.app/api/user?pageIndex=${currentPage.current}&pageSize=${rows}`
      )
      .then((res) => {
        setPageCount(res.data.result.totalPages);
        setUsers(res.data.result.items);
      });
  }

  async function deleteUser(id) {
    swal.fire({
      title: 'Are you sure?',
      text: `Do you want to Delete Book?`,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes Delete!',
      reverseButtons: true,
      confirmButtonColor: '#f14d54'
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://book-e-sell-node-api.vercel.app/api/user?id=${id}`);
          rerender();
        } catch (error) {
          alert(error.response.data.error);
        }
      }
    })
  }

  return (
    <>
      <div className='flex flex-col h-screen justify-between'>
        <div>
          <Header />
          <div className='w-8/12 mx-auto text-center text-4xl mt-6 mb-16'>
            <span className='text-gray-700 font-semibold'>User
            </span>
          </div>
          <Wrapper>
            <div className="container w-8/12 mx-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b">
                    <th className="pb-6">First Name</th>
                    <th className="pb-6">Last Name</th>
                    <th className="pb-6">Email</th>
                    <th className="pb-6">Role</th>
                    <th className="pb-6"></th>
                  </tr>
                </thead>
                <tbody>

                  {users.map((user) => {
                    return (
                      <tr className="border-b text-gray-800" key={user.id}>
                        <td className="py-8">{user.firstName}</td>
                        <td className="py-8">{user.lastName}</td>
                        <td className="py-8">{user.email}</td>
                        <td className="py-8">{user.id}</td>
                        <td className="py-8 grow flex gap-3">
                          <Link to={'/users/' + user.id} className="grow border-green-600 text-green-600 py-1 rounded-md border text-center">Edit</Link>
                          {user.id != y && (
                            <button onClick={() => deleteUser(user.id)} className="grow border-rose-400 text-rose-400 py-1 rounded-md border text-center">Delete</button>
                          )}
                          {user.id == y && (
                            <button onClick={() => deleteUser(user.id)} className="grow text-rose-400 py-1 rounded-md text-center"></button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Wrapper>

          <div className="flex justify-end items-center w-8/12 mx-auto text-center  mt-6 mb-4 p-3">
            Rows per page:
            <select className="ml-2 px-3 py-3 border" onChange={handleSelectChange}>
              {renderOptions()}
            </select>
          </div>
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            pageCount={pageCount}
            previousLabel="< "
            renderOnZeroPageCount={null}
            containerClassName="pagination justify-content-center pagination-lg"
            pageClassName=""
            pageLinkClassName="rounded-full p-4 h-2 w-2 flex items-center justify-center"
            previousClassName="rounded-full p-4 h-2 w-2 flex items-center justify-center"
            previousLinkClassName="rounded-full p-4 h-2 w-2 flex items-center justify-center"
            nextClassName="rounded-full p-4 h-2 w-2 flex items-center justify-center"
            nextLinkClassName="rounded-full p-4 h-2 w-2 flex items-center justify-center"
            activeClassName="text-white bg-rose-500 rounded-full p-4 h-2 w-2 flex items-center justify-center"
            className=' flex mb-6 items-center justify-center gap-5 p-4 mt-10'
          />


        </div>


        <Footer />
      </div>

    </>
  );
}


const Wrapper = styled.section`
  /* padding: 5rem 0; */

  .grid-four-column {
    grid-template-columns: repeat(4, 1fr);
  }

  .relative-name {
    display: flex;
    justify-content: right;
    input, Button {
      margin-left: 2rem;
      margin-top: 2rem;
      margin-bottom: 2rem;
    } 
  }

  @media (max-width: ${({ theme }) => theme.media.tab}){
    .relative-name{
      flex-direction: column;
      align-items: center;
      justify-content: center;
      
    }
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}){
    .relative-name{
      flex-direction: column;
      align-items: center;
      justify-content: center;
      
    }
  }

  .jagya {
    display: flex;
    align-items: center;
    justify-content: center;

    h1 {
      color: #5138ee;
    }
  }

  .grid-five-column {
    grid-template-columns: repeat(4, 1fr) 0.3fr;
    text-align: center;
    align-items: center;
  }
  .cart-heading {
    text-align: center;
    text-transform: uppercase;
  }
  hr {
    margin-top: 1rem;
    margin-bottom: 1.5rem;
  }
  .cart-item {
    padding: 3.2rem 0;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
  }

  .cart-user--profile {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1.2rem;
    margin-bottom: 5.4rem;

    img {
      width: 8rem;
      height: 8rem;
      border-radius: 50%;
    }
    h2 {
      font-size: 2.4rem;
    }
  }
  .cart-user--name {
    text-transform: capitalize;
  }
  .cart-image--name {
    /* background-color: red; */
    align-items: center;
    display: grid;
    gap: 1rem;
    grid-template-columns: 0.4fr 1fr;
    text-transform: capitalize;
    text-align: left;
    img {
      max-width: 5rem;
      height: 5rem;
      object-fit: contain;
      color: transparent;
    }

    .color-div {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 1rem;

      .color-style {
        width: 1.4rem;
        height: 1.4rem;

        border-radius: 50%;
      }
    }
  }

  .cart-two-button {
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;

    .btn-clear {
      background-color: #e74c3c;
    }
  }

  .amount-toggle {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2.4rem;
    font-size: 1.4rem;

    button {
      border: none;
      background-color: #fff;
      cursor: pointer;
    }

    .amount-style {
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.btn};
    }
  }

  .remove_icon {
    font-size: 1.6rem;
    color: #e74c3c;
    cursor: pointer;
  }

  .order-total--amount {
    width: 100%;
    margin: 4.8rem 0;
    text-transform: capitalize;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;

    .order-total--subdata {
      border: 0.1rem solid #f0f0f0;
      display: flex;
      flex-direction: row;
      gap: 1.8rem;
      padding: 3.2rem;

      select {
        height: 3rem;
      }
    }
    div {
      display: flex;
      gap: 3.2rem;
      justify-content: space-between;
    }

    div:last-child {
      background-color: #fafafa;
    }

    div p:last-child {
      font-weight: bold;
      color: ${({ theme }) => theme.colors.heading};
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid-five-column {
      grid-template-columns: 1.5fr 1fr 0.5fr;
    }
    .cart-hide {
      display: none;
    }

    .cart-two-button {
      margin-top: 2rem;
      display: flex;
      justify-content: space-between;
      gap: 2.2rem;
    }

    .order-total--amount {
      width: 100%;
      text-transform: capitalize;
      justify-content: flex-start;
      align-items: flex-start;

      .order-total--subdata {
        width: 100%;
        border: 0.1rem solid #f0f0f0;
        display: flex;
        flex-direction: column;
        gap: 1.8rem;
        padding: 3.2rem;
      }
    }
  }
`;


export default withSwal(({ swal }, ref) => (
  <User swal={swal} />
));
