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
            console.error("VITE_GEOAPIKEY is missing in .env file")
            return
        }

        if (!navigator.geolocation) {
            console.error("Geolocation not supported")
            dispatch(setCurrentCity("Nagpur"))
            dispatch(setCurrentState("Maharashtra"))
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
                        console.error("No geocoding results found")
                        dispatch(setCurrentCity("Nagpur"))
                        dispatch(setCurrentState("Maharashtra"))
                        return
                    }

                    dispatch(setCurrentCity(data.city || data.county || "Nagpur"))
                    dispatch(setCurrentState(data.state || "Maharashtra"))
                    dispatch(setCurrentAddress(data.address_line2 || data.address_line1 || ""))
                    dispatch(setAddress(data.address_line2 || data.address_line1 || ""))

                } catch (error) {
                    console.error("Geocoding API failed:", error?.response?.data || error.message)
                    // Fallback so app doesn't stay blank
                    dispatch(setCurrentCity("Nagpur"))
                    dispatch(setCurrentState("Maharashtra"))
                }
            },
            (error) => {
                // This was completely missing before — caused silent blank page
                console.error("Geolocation denied:", error.message)
                dispatch(setCurrentCity("Nagpur"))
                dispatch(setCurrentState("Maharashtra"))
            },
            { timeout: 10000, enableHighAccuracy: false }
        )

    }, [userData?._id]) // ✅ Fixed: was [userData] causing infinite re-renders

}

export default useGetCity