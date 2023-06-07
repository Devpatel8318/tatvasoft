import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
export const CartContext = createContext({});

export function CartContextProvider({ children }) {
    const [numberOfItems, setNumberOfItems] = useState(0);
    const [details, setDetails] = useState([]);
    const [total, setTotal] = useState(0);
    const { user } = useContext(UserContext);

    useEffect(() => {
        console.log("use Effect Called");
        // console.log(user);
        if (user) {
            updateCart();
        }
    }, [user]);

    function updateCart() {
        axios.get("https://book-e-sell-node-api.vercel.app/api/cart?userId=" + user)
            .then((res) => {
                console.log(res.data.result);
                const cartsArray = res.data.result;
                setNumberOfItems(cartsArray.length);
                setDetails(res.data.result);
                console.log(details);
                // let temp = 0;
                // if (details.length > 0) {
                //     for (let i = 0; i < details.length; i++) {
                //         temp += details[i].quantity * details[i].book.price;
                //     }
                //     setTotal(temp);
                // }
            });
    }
    useEffect(() => {
        updateTotal();
    }, [details])

    function updateTotal() {
        let temp = 0;
        if (details.length > 0) {
            for (let i = 0; i < details.length; i++) {
                temp += details[i].quantity * details[i].book.price;
            }
            setTotal(temp);
        }
    }

    async function addToCart(id) {

        let isBookExist = 0;


        console.log(details);
        for (let i = 0; i < details.length; i++) {
            if (details[i].bookId === id) {
                isBookExist = 1;
                break;
            }
        }

        if (isBookExist === 0) {
            const data = {
                "bookId": id,
                "userId": user,
                "quantity": 1
            }
            console.log(data);
            await axios.post(`https://book-e-sell-node-api.vercel.app/api/cart`, data);
            updateCart();
        }
    }

    async function increaseAmount(cartid, bookid, quantity) {
        const data = {
            "id": cartid,
            "bookId": bookid,
            "userId": user,
            "quantity": quantity + 1,
        }
        console.log(data);
        await axios.put(`https://book-e-sell-node-api.vercel.app/api/cart`, data);
        updateCart();
    }
    async function decreaseAmount(cartid, bookid, quantity) {
        if (quantity > 1) {

            const data = {
                "id": cartid,
                "bookId": bookid,
                "userId": user,
                "quantity": quantity - 1,
            }
            console.log(data);
            await axios.put(`https://book-e-sell-node-api.vercel.app/api/cart`, data);
            updateCart();
        }
    }


    async function removeBook(cartId) {
        await axios.delete(`https://book-e-sell-node-api.vercel.app/api/cart?id=${cartId}`);
        updateCart();
    }

    async function placeOrder() {
        if (numberOfItems > 0) {

            let cartIds = [];
            for (let i = 0; i < details.length; i++) {
                cartIds.push(details[i].id);
            }

            const data = {
                userId: user,
                cartIds,
            }
            await axios.post(`https://book-e-sell-node-api.vercel.app/api/order`, data);
            setTotal(0);
            updateCart();
        } else {
            alert("Cart Empty");
        }

    }
    return (<CartContext.Provider
        value={{ numberOfItems, setNumberOfItems, total, addToCart, increaseAmount, details, removeBook, decreaseAmount, placeOrder }}>
        {children}
    </CartContext.Provider>)
} 