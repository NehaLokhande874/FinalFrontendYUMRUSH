import axios from 'axios'
import { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setShopsInMyCity } from '../redux/userSlice'

function useGetShopByCity() {
  const dispatch = useDispatch()
  const { currentCity } = useSelector(state => state.user)

  useEffect(() => {
    const fetchShops = async () => {
      try {
        let result;
        if (!currentCity || currentCity === "null" || currentCity === "All") {
          result = await axios.get(`${serverUrl}/api/shop/get-all`, { withCredentials: true })
        } else {
          result = await axios.get(`${serverUrl}/api/shop/get-by-city/${currentCity}`, { withCredentials: true })
        }
        const data = Array.isArray(result.data) ? result.data : []
        dispatch(setShopsInMyCity(data))
      } catch (error) {
        console.log(error)
        dispatch(setShopsInMyCity([]))
      }
    }
    fetchShops()
  }, [currentCity])
}

export default useGetShopByCity
