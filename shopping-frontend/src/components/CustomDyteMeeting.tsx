import { DyteCameraToggle, DyteChat, DyteControlbar, DyteGrid, DyteLeaveButton, DyteMeeting, DyteMicToggle } from "@dytesdk/react-ui-kit";
import { useDyteMeeting } from "@dytesdk/react-web-core";
import React, { useEffect } from "react";

interface CustomDyteMeetingProps {
  onRoomLeft: () => void
}

const CustomDyteMeeting: React.FC<CustomDyteMeetingProps> = ({ onRoomLeft }) => {
  const { meeting } = useDyteMeeting();

  return (
    <div className="h-full w-full flex flex-row space-x-2">
      <div className="flex flex-col w-3/4">
        <DyteControlbar meeting={meeting} style={{ borderRadius: "10px" }} />
        <div className="flex-1">
          <DyteGrid meeting={meeting} size="sm" />
        </div>
        <div className="flex flex-row justify-center space-x-2">
          <DyteMicToggle meeting={meeting} />
          <DyteCameraToggle meeting={meeting} />
          <DyteLeaveButton onClick={() => meeting.leaveRoom()} />
        </div>
      </div>
      <div className="flex-1 border rounded-md">
        <DyteChat meeting={meeting} style={{ borderRadius: "10px" }} />
      </div>
      {/* <DyteMeeting meeting={meeting} mode="fill" /> */}
    </div>
  )
}

export default CustomDyteMeeting
