import axios from "axios";
import React, { FormEvent, useState } from "react";
import { createLiveVideoRequest } from "../api/backend";
import { IProduct } from "../types/product";
import LiveMeetingWrapper from "./LiveMeetingWrapper";

interface VideoShoppingModalProps {
  onClose: () => void,
  meetingId?: number,
  product: IProduct
}

const VideoShoppingModal: React.FC<VideoShoppingModalProps> = ({ onClose, product, meetingId }) => {

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [videoRequestId, setVideoRequestId] = useState<number>()

  const submitVideoRequest = async (e: FormEvent) => {
    const video_request = await createLiveVideoRequest({
      user_email: email,
      user_name: name,
      product: product
    })
    setVideoRequestId(video_request.id);
  }

  const renderProductDetails = (product: IProduct) => {
    return <div className="flex flex-col h-full">
      <div className="h-1/2">
        <img className="p-8 rounded-t-lg object-scale-down h-full mx-auto" src={product.image + ''} />
      </div>
      <div className="flex flex-col p-8">
        <div className="text-lg font-semibold tracking-tight text-gray-900">{product.title}</div>
        {product.rating && <div className="flex mt-2.5 mb-2 flex-wrap">
          {[...Array(Math.round(product.rating.rate)).keys()].map((key) => {
            return <svg key={key} aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
          })}
          {[...Array(5 - Math.round(product.rating.rate)).keys()].map((key) => {
            return <svg key={key} aria-hidden="true" className="w-5 h-5 text-slate-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
          })}
          <span className="h-5 bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ml-3">{product.rating.rate}</span>
        </div>}
        {product.price && <div className="text-xl font-bold text-gray-900 flex-grow">${product.price}</div>}
        {!meetingId && <div className="flex items-center space-x-4 pt-3 justify-center">
          <a
            href="#"
            className="flex flex-row text-white rounded-full px-3 py-2 bg-yellow-600 items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M6 5v1H4.667a1.75 1.75 0 00-1.743 1.598l-.826 9.5A1.75 1.75 0 003.84 19H16.16a1.75 1.75 0 001.743-1.902l-.826-9.5A1.75 1.75 0 0015.333 6H14V5a4 4 0 00-8 0zm4-2.5A2.5 2.5 0 007.5 5v1h5V5A2.5 2.5 0 0010 2.5zM7.5 10a2.5 2.5 0 005 0V8.75a.75.75 0 011.5 0V10a4 4 0 01-8 0V8.75a.75.75 0 011.5 0V10z" clipRule="evenodd" />
            </svg>
            <span className="ml-2 text-sm font-bold">Add to Cart</span>
          </a>
        </div>}
      </div>

    </div>
  }

  const renderMeeting = () => {
    if (meetingId) {
      return <div className="flex-1 h-full rounded">
        <LiveMeetingWrapper id={meetingId} type="support" onMeetingEnd={onClose}></LiveMeetingWrapper>
      </div>
    } else if (videoRequestId) {
      return <div className="flex-1 h-full rounded">
        <LiveMeetingWrapper id={videoRequestId} type="user" onMeetingEnd={onClose}></LiveMeetingWrapper>
      </div>
    }
    return <></>
  }

  const renderUserForm = () => {
    return <div className="flex-1 pl-5 flex align-center justify-center">
      <div className="space-y-6 w-1/2">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="John Doe" required />
        </div>
        <div className="flex space-x-2">
          <button onClick={onClose} className="flex-1 text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cancel</button>
          <button onClick={submitVideoRequest} className="flex-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Start Call</button>
        </div>
      </div>
    </div>
  }

  return (
    <div id="staticModal" className="fixed top-0 left-0 right-0 z-50 w-full h-screen p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">
      <div className="fixed top-0 left-0 w-full h-full opacity-80 bg-slate-200"></div>
      <div className="relative mx-auto my-auto w-full h-[90%] max-w-[80%] opacity-100 bg-white rounded-lg shadow p-5">
        <div className="flex-1 flex flex-row justify-center align-center h-full space-x-2">
          <div className="w-1/3">
            {renderProductDetails(product)}
          </div>
          {!videoRequestId && !meetingId && renderUserForm()}
          {renderMeeting()}
        </div>
      </div>
    </div>
  )
}

export default VideoShoppingModal;
