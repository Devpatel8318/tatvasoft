import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateUser } from '../../state/slice/userSlice'


function Test() {

    const user = useSelector((state) => state.users.userName);
    const dispatch = useDispatch();

    // dispatch(updateUser("dev"));

    return (
        <div>{user}</div>
    )
}

export default Test