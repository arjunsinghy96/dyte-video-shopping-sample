import React, { useEffect, useState } from "react";
import { listLiveVideoRequest, LiveVideoRequest } from "../../api/backend";
import VideoShoppingModal from "../../components/VideoShoppingModal";


const LiveRequestPage: React.FC = () => {
  const [liveRequests, setLiveRequests] = useState<LiveVideoRequest[]>([])
  const [activeLiveVideoRequest, setActiveLiveVideoRequest] = useState<LiveVideoRequest>()
  const [showModal, setShowModal] = useState<boolean>(false)

  const startMeeting = (videoRequest: LiveVideoRequest) => {
    setActiveLiveVideoRequest(videoRequest);
    setShowModal(true)
  }

  useEffect(() => {
    const getliveRequests = async () => {
      const resp = await listLiveVideoRequest();
      setLiveRequests(resp)
    }
    getliveRequests();
  }, [])

  return (
    <div className="max-w-lg flex flex-col space-y-4 mx-auto rounded">
      {
        liveRequests.map((req: LiveVideoRequest) => {
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
