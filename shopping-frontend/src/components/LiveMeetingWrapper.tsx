import { provideDyteDesignSystem } from "@dytesdk/react-ui-kit";
import { DyteProvider, useDyteClient } from "@dytesdk/react-web-core";
import React, { useEffect } from "react";
import { getUserToken, startLiveVideoRequest } from "../api/backend";
import CustomDyteMeeting from "./CustomDyteMeeting";

interface LiveMeetingWrapperProps {
  id: number;
  type: "user" | "support";
  dyte_auth_token?: string;
  onMeetingEnd: () => void
}

const LiveMeetingWrapper: React.FC<LiveMeetingWrapperProps> = ({ id, type, dyte_auth_token, onMeetingEnd }) => {
  const [meeting, initMeeting] = useDyteClient();

  const getDyteAuthToken = async (): Promise<string> => {
    if (type === 'user') {
      const auth_token = await getUserToken(id);
      return auth_token.dyte_auth_token
    } else {
      const auth_token = await startLiveVideoRequest(id)
      return auth_token.dyte_auth_token
    }
  }

  const setupDyteMeeting = async () => {
    if (!dyte_auth_token) {
      dyte_auth_token = await getDyteAuthToken();
    }
    await initMeeting({
      authToken: dyte_auth_token,
      defaults: {
        audio: false,
        video: false
      }
    })
  }

  useEffect(() => {
    setupDyteMeeting();
  }, [])

  useEffect(() => {
    provideDyteDesignSystem(document.body, {
      theme: 'light',
    });
  }, []);

  useEffect(() => {
    if (meeting) {
      meeting.joinRoom();
      meeting.self.on('roomLeft', onMeetingEnd);
      return () => {
        meeting.self.removeListener('roomLeft', onMeetingEnd);
      }
    }
  }, [meeting]);

  return (
    <DyteProvider value={meeting} fallback={<div>Loading</div>}>
      <CustomDyteMeeting onRoomLeft={onMeetingEnd} />
    </DyteProvider>
  )
}

export default LiveMeetingWrapper;
