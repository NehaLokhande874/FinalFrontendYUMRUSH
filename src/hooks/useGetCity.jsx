import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentAddress, setCurrentCity, setCurrentState } from '../redux/userSlice'
import { setAddress, setLocation } from '../redux/mapSlice'

function useGetCity() {
    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.user)
    const apiKey = import.meta.env.VITE_GEOAPIKEY

    useEffect(() => {
        if (!apiKey) {
            dispatch(setCurrentCity("All"))
            return
        }
        if (!navigator.geolocation) {
            dispatch(setCurrentCity("All"))
            return
        }
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const latitude = position.coords.latitude
                    const longitude = position.coords.longitude
                    dispatch(setLocation({ lat: latitude, lon: longitude }))
                    const result = await axios.get(
                        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`
                    )
                    const data = result?.data?.results?.[0]
                    if (!data) {
                        dispatch(setCurrentCity("All"))
                        return
                    }
                    const detectedCity = data.city || data.county || ""
                    const allowedCities = ["Khamgaon", "Shegaon"]
                    if (allowedCities.includes(detectedCity)) {
                        dispatch(setCurrentCity(detectedCity))
                    } else {
                        dispatch(setCurrentCity("All"))
                    }
                    dispatch(setCurrentState(data.state || "Maharashtra"))
                    dispatch(setCurrentAddress(data.address_line2 || data.address_line1 || ""))
                    dispatch(setAddress(data.address_line2 || data.address_line1 || ""))
                } catch (error) {
                    dispatch(setCurrentCity("All"))
                }
            },
            (error) => {
                dispatch(setCurrentCity("All"))
            },
            { timeout: 10000, enableHighAccuracy: false }
        )
    }, [userData?._id])
}

export default useGetCity
