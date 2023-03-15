import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

interface VideoShoppingButtonProps {
  id: number,
  title: string,
  imageUrl?: URL
}

const VideoShoppingButton: React.FC<VideoShoppingButtonProps> = ({ id, title, imageUrl }) => {
  const navigate = useNavigate();

  const startVideoShopping = async () => {
    console.log(`starting video shopping for product id ${id}`)
    const resp = await axios.post('http://localhost:8000/live_shopping/live_requests/', {
      product: {
        id: id,
        title: title,
        image: imageUrl
      }
    })
    console.log(resp.data)
    navigate(`/live-meeting/${resp.data.id}`)
  }

  return (
    <a
      href="#"
      className="flex flex-row text-white rounded-full px-3 py-2 bg-indigo-600 items-center justify-center"
      onClick={startVideoShopping}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path d="M3.25 4A2.25 2.25 0 001 6.25v7.5A2.25 2.25 0 003.25 16h7.5A2.25 2.25 0 0013 13.75v-7.5A2.25 2.25 0 0010.75 4h-7.5zM19 4.75a.75.75 0 00-1.28-.53l-3 3a.75.75 0 00-.22.53v4.5c0 .199.079.39.22.53l3 3a.75.75 0 001.28-.53V4.75z" />
      </svg>
      <span className="ml-2 text-sm font-bold">Video Shop</span>
    </a>
  )
}

export default VideoShoppingButton;
