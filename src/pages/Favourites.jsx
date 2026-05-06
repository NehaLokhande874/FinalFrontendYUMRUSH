import React, { useEffect, useState } from "react"
import axios from "axios"
import { serverUrl } from "../App"
import { FaHeart } from "react-icons/fa"
import Nav from "../components/Nav"

export default function Favourites() {
  const [favourites, setFavourites] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${serverUrl}/api/user/favourites`, { withCredentials: true })
      .then(res => setFavourites(res.data.favourites || []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const handleRemove = async (itemId) => {
    await axios.post(`${serverUrl}/api/user/favourite/${itemId}`, {}, { withCredentials: true })
    setFavourites(prev => prev.filter(item => item._id !== itemId))
  }

  return (
    <div className="min-h-screen bg-[#fff9f6]">
      <Nav />
      <div className="max-w-5xl mx-auto px-4 pt-24 pb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FaHeart className="text-red-500" /> My Favourites
        </h1>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : favourites.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">??</div>
            <p className="text-gray-500 text-lg">No favourites yet!</p>
            <p className="text-gray-400 text-sm mt-1">Tap the ?? on any food item to save it here</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favourites.map(item => (
              <div key={item._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="relative">
                  <img src={item.image} alt={item.name} className="w-full h-[150px] object-cover" />
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow"
                  >
                    <FaHeart className="text-red-500 text-sm" />
                  </button>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-gray-800 truncate">{item.name}</h3>
                  <p className="text-gray-500 text-sm">{item.category}</p>
                  <p className="text-orange-500 font-bold mt-1">?{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
