import React, { useMemo } from "react";
import "../../styles/event-strip.scss";

function EventStrip(props) {
  // Memoize the mapped event messages
  const eventMessages = useMemo(() => {
    return props?.events?.map((event, index) => (
      <div key={index} className="event-message">
        {event?.message}
      </div>
    ));
  }, [props.events]); // Recompute only when props.events changes

  return (
    <div className="event-strip">
      <div className="event-messages">{eventMessages}</div>
    </div>
  );
}

export default React.memo(EventStrip);
