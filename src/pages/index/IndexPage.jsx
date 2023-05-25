
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useState } from "react";

function createData(id, name, calories, fat, carbs, protein) {
    return { id, name, calories, fat, carbs, protein };
}

export default function ProductList() {


    const [newRowData, setNewRowData] = useState({
        name: '',
        calories: '',
        fat: '',
        carbs: '',
        protein: '',
    });

    const [rows, setRows] = useState([
        createData(5, 'Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData(1, 'Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData(2, 'Eclair', 262, 16.0, 24, 6.0),
        createData(3, 'Cupcake', 305, 3.7, 67, 4.3),
        createData(4, 'Gingerbread', 356, 16.0, 49, 3.9),]);

    const [nextId, setNextId] = useState(6);

    const handleRemoveRow = (id) => {
        const updatedRows = rows.filter((row) => row.id !== id);
        setRows(updatedRows);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewRowData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleAddRow = () => {
        if (
            newRowData.name.trim() === '' ||
            newRowData.calories.trim() === '' ||
            newRowData.fat.trim() === '' ||
            newRowData.carbs.trim() === '' ||
            newRowData.protein.trim() === ''
        ) {
            alert('Please fill in all fields');
            return;
        }

        if (
            isNaN(newRowData.calories) ||
            isNaN(newRowData.fat) ||
            isNaN(newRowData.carbs) ||
            isNaN(newRowData.protein)
        ) {
            alert('Please enter numeric values for calories, fat, carbs, and protein');
            return;
        }


        const newRow = createData(
            nextId, // generate a unique id for the new row
            newRowData.name,
            parseInt(newRowData.calories),
            parseFloat(newRowData.fat),
            parseInt(newRowData.carbs),
            parseFloat(newRowData.protein)
        );

        setRows((prevRows) => [...prevRows, newRow]);
        setNewRowData({
            name: '',
            calories: '',
            fat: '',
            carbs: '',
            protein: '',
        });
    };


    return (
        <>
            <div className='flex flex-col h-screen justify-between'>
                <div>
                    <Header />
                    <div className='px-10 mt-10'>

                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Dessert (100g serving)</TableCell>
                                        <TableCell align="right">Calories</TableCell>
                                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                                        <TableCell align="center">Remove</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (


                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.calories}</TableCell>
                                            <TableCell align="right">{row.fat}</TableCell>
                                            <TableCell align="right">{row.carbs}</TableCell>
                                            <TableCell align="right">{row.protein}</TableCell>
                                            <TableCell align="center">
                                                <button onClick={() => handleRemoveRow(row.id)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>
                                                </button>
                                            </TableCell>
                                        </TableRow>



                                    ))}


                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} className='bg-gray-100 border shadow-lg'>
                                        <TableCell component="th" scope="row">
                                            <input
                                                type="text"
                                                name="name"
                                                value={newRowData.name}
                                                onChange={handleInputChange}
                                                placeholder="Name"
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <input
                                                type="text"
                                                name="calories"
                                                value={newRowData.calories}
                                                onChange={handleInputChange}
                                                placeholder="Calories" />
                                        </TableCell>
                                        <TableCell align="right">
                                            <input
                                                type="text"
                                                name="fat"
                                                value={newRowData.fat}
                                                onChange={handleInputChange}
                                                placeholder="Fat" />
                                        </TableCell>
                                        <TableCell align="right">
                                            <input
                                                type="text"
                                                name="carbs"
                                                value={newRowData.carbs}
                                                onChange={handleInputChange}
                                                placeholder="Carbs" />
                                        </TableCell>
                                        <TableCell align="right">
                                            <input
                                                type="text"
                                                name="protein"
                                                value={newRowData.protein}
                                                onChange={handleInputChange}
                                                placeholder="Protein" />
                                        </TableCell>
                                        <TableCell align="center bg-red-100">
                                                <button onClick={handleAddRow} className='text-red-500 flex justify-center items-center gap-1 w-full'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                                                    <span>Add</span>
                                                </button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>

                <Footer />
            </div>

        </>
    );
}