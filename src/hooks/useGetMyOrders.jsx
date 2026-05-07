import axios from 'axios'
import { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setMyOrders } from '../redux/userSlice'

function useGetMyOrders() {
    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.user)

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/order/my-orders`, { withCredentials: true })
                const data = Array.isArray(result.data) ? result.data : []
                dispatch(setMyOrders(data))
            } catch (error) {
                console.log(error)
                dispatch(setMyOrders([]))
            }
        }
        fetchOrders()
    }, [userData])
}

export default useGetMyOrders
