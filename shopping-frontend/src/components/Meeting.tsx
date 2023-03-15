import { DyteCameraToggle, DyteChat, DyteControlbar, DyteGrid, DyteLeaveButton, DyteMeeting, DyteMicToggle } from "@dytesdk/react-ui-kit";
import { DyteProvider, useDyteClient, useDyteMeeting, useDyteSelector } from "@dytesdk/react-web-core";
import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

interface MeetingProps {
  id: number,
  auth_token?: string
}

const reducer = (state: any, action: {
  dyte_auth_token?: any; type: any;
}) => {
  switch (action.type) {
    case ('set_dyte_auth_token'):
      return {
        ...state,
        dyte_auth_token: action.dyte_auth_token,
      }
    case ('set_show_meeting'):
      return {
        ...state,
        show_meeting: true
      }
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
}

const MeetingEl: React.FC = () => {
  const navigate = useNavigate()
  const { meeting } = useDyteMeeting();

  meeting.self.on('roomLeft', (el) => {
    navigate('/')
  })

  meeting.joinRoom()

  return (
    <div className="h-full w-full flex flex-row space-x-2">
      <div className="flex flex-col w-3/4">
        <DyteControlbar meeting={meeting} />
        <div className="flex-1">
          <DyteGrid meeting={meeting} size="sm" />
        </div>
        <div className="flex flex-row justify-center border rounded py-2">
          <DyteMicToggle meeting={meeting} />
          <DyteCameraToggle meeting={meeting} />
          <DyteLeaveButton onClick={() => meeting.leaveRoom()} variant="horizontal" />
        </div>
      </div>
      <div className="flex-1 bg-slate-600 rounded text-black">
        <DyteChat meeting={meeting} />
      </div>
    </div>
  )
}

const Meeting: React.FC<MeetingProps> = ({ id }) => {

  const [state, dispatch] = useReducer(reducer, { dyte_auth_token: null, show_meeting: false })
  const [meeting, initMeeting] = useDyteClient()

  const setupDyteMeeting = async () => {
    const resp = await axios.get(`http://localhost:8000/live-shopping/live-requests/${id}/user-token/`)
    const auth_token = resp.data.dyte_auth_token;

    dispatch({ type: 'set_dyte_auth_token', dyte_auth_token: auth_token })
    await initMeeting({
      authToken: auth_token,
      defaults: {
        audio: false,
        video: false
      }
    })
    await meeting?.joinRoom()
    dispatch({ type: 'set_show_meeting' })
    // setupMeetingHooks()
  }

  useEffect(() => {
    setupDyteMeeting()
  }, [])
  return (
    <DyteProvider value={meeting} fallback={''}>
      <MeetingEl></MeetingEl>
    </DyteProvider>
  )
}

export default Meeting
