import axios from 'axios'
import { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setItemsInMyCity } from '../redux/userSlice'

function useGetItemsByCity() {
  const dispatch = useDispatch()
  const { currentCity } = useSelector(state => state.user)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        let result;
        if (!currentCity || currentCity === "null" || currentCity === "All") {
          result = await axios.get(`${serverUrl}/api/item/get-all-items`, { withCredentials: true })
        } else {
          result = await axios.get(`${serverUrl}/api/item/get-by-city/${currentCity}`, { withCredentials: true })
        }
        const data = Array.isArray(result.data) ? result.data : []
        dispatch(setItemsInMyCity(data))
      } catch (error) {
        console.log(error)
        dispatch(setItemsInMyCity([]))
      }
    }
    fetchItems()
  }, [currentCity])
}

export default useGetItemsByCity
