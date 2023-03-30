import React, { useEffect, useState } from "react";
import { listLiveVideoRequest, LiveVideoRequest } from "../../api/backend";
import AppHeader from "../../components/AppHeader";
import VideoButton from "../../components/VideoButton";
import VideoShoppingModal from "../../components/VideoShoppingModal";


const LiveRequestPage: React.FC = () => {
  const [liveRequests, setLiveRequests] = useState<LiveVideoRequest[]>([])
  const [activeLiveVideoRequest, setActiveLiveVideoRequest] = useState<LiveVideoRequest>()
  const [showModal, setShowModal] = useState<boolean>(false)

  const startMeeting = (videoRequest: LiveVideoRequest) => {
    setActiveLiveVideoRequest(videoRequest);
    setShowModal(true)
  }

  const getliveRequests = async () => {
    const resp = await listLiveVideoRequest();
    setLiveRequests(resp)
  }

  useEffect(() => {
    getliveRequests();
  }, [])

  return (
    <>
      <AppHeader />

      <div className="max-w-lg flex flex-col space-y-4 mx-auto rounded">
        <div className="self-center">
          <button
            onClick={() => getliveRequests()}
            className="px-3 py-2 rounded bg-indigo-500 hover:bg-indigo-700 text-white font-bold">
            Refresh
          </button>
        </div>
        {liveRequests.length == 0 && <div className="flex flex-col items-center gap-y-2">
          <div className="text-slate-500 text-sm">No video requests from shoppers.</div>
        </div>}
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
    </>
  )
}

export default LiveRequestPage
