import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateUser } from '../../state/slice/userSlice'
import { Navigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux'
// import { updateUser } from '../../state/slice/userSlice'

function Test() {
    const userRedux = useSelector((state) => state.users.userName);
    const dispatch = useDispatch();


    // const user = useSelector((state) => state.users.userName);
    // const dispatch = useDispatch();

    function update(name) {
        dispatch(updateUser(name));
    }

    // if (!userRedux) {
    //     return <Navigate to={'/'} />
    // }

    return (
        <>
            <h1 className='p-4'>hello</h1>
            <input className='border p-4 m-4' type="text" value={userRedux} onChange={ev => update(ev.target.value)} name="name mate text" />
            <div className='border p-4 m-4' >{userRedux}</div>
        </>
    )
}

export default Test