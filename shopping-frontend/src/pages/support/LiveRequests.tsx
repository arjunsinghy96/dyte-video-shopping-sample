import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listLiveVideoRequest, LiveVideoRequest } from "../../api/backend";
import { getProduct } from "../../api/fakestore";
import VideoShoppingModal from "../../components/VideoShoppingModal";
import { IProduct } from "../../types/product";

function reducer(state: any, action: { liveRequests: LiveVideoRequest[]; type: string }) {
  switch (action.type) {
    case 'set_liveRequests':
      return {
        liveRequests: action.liveRequests
      }
  }

  throw Error("Unknown action: " + action.type)
}

const LiveRequestPage: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, { liveRequests: [] })
  const navigate = useNavigate()
  const [activeLiveVideoRequest, setActiveLiveVideoRequest] = useState<LiveVideoRequest>()
  const [showModal, setShowModal] = useState<boolean>(false)

  const startMeeting = (videoRequest: LiveVideoRequest) => {
    setActiveLiveVideoRequest(videoRequest);
    setShowModal(true)
  }

  useEffect(() => {
    const getliveRequests = async () => {
      const resp = await listLiveVideoRequest();
      console.log(resp)
      dispatch({
        type: 'set_liveRequests',
        liveRequests: resp
      })
    }
    getliveRequests();
  }, [])

  return (
    <div className="max-w-lg flex flex-col space-y-4 mx-auto rounded">
      {
        state.liveRequests.map((req: LiveVideoRequest) => {
          return (
            <div key={req.id} className="p-5 border flex flex-row justify-between">
              <div className="text-xl font-bold">{req.product.title}</div>
              <div>
                <button onClick={() => startMeeting(req)} className="rounded-full bg-indigo-600 text-white px-3 py-2">Join</button>
              </div>
            </div>
          )
        })
      }
      {showModal && activeLiveVideoRequest &&
        <VideoShoppingModal
          onClose={() => setShowModal(false)}
          meetingId={activeLiveVideoRequest.id}
          product={activeLiveVideoRequest.product}
        />
      }
    </div>
  )
}

export default LiveRequestPage
