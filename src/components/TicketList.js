import React from "react";
import PropTypes from "prop-types";
import Ticket from "./Ticket";
import { useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';

function TicketList(props) {
  useFirestoreConnect([
    { collection: 'tickets' }
  ]);

  const tickets = useSelector(state => state.firestore.ordered.tickets);

  if (isLoaded(tickets)) {
    return (
      <>
        <hr />
        {tickets.map((ticket) => {
          return <Ticket
            whenTicketClicked={props.onTicketSelection}
            names={ticket.names}
            location={ticket.location}
            issue={ticket.issue}
            formattedWaitTime={ticket.formattedWaitTime}
            id={ticket.id}
            key={ticket.id}
          />
        })}
      </>
    )
  } else {
    return (
      <>
        <img alt="computer on fire for loading screen" src="https://media.giphy.com/media/HfUUBiJ3s3kqEhTKhz/giphy.gif"></img>
        <h3>Thinking I might work at some point... might not.</h3>
      </>
    )
  }
}

TicketList.propTypes = {
  onTicketSelection: PropTypes.func
};

export default TicketList;