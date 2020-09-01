import React from "react";
import _ from "lodash";
import styled from "styled-components";

import { getFormattedDateString } from "../utils";

import { Event } from "../types";

type Props = {
  selectedEventId?: string;
  selectEventId: Function;
  events: Event[];
};

const Wrapper = styled.div`
  overflow-y: auto;
  padding: 0.5rem;
  flex-grow: 1;
  align-content: stretch;
  display: flex;
  flex-direction: column;
`;

type EventCardProps = {
  selected: boolean;
};

const EventCard = styled.button<EventCardProps>`
  text-align: left;
  display: grid;
  row-gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: 0px 4px 10px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 0.5rem;
  background-color: #222;
  color: #ddd;
  outline: 0;
  border: 2px solid ${(props) => (props.selected ? "#af7f4c" : "rgba(0,0,0,0)")};
  cursor: pointer;

  h2 {
    font-size: 1rem;
    font-weight: 300;
  }
`;

const InfoBar = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  column-gap: 0.25rem;
  align-items: center;
`;

const MinorText = styled.span`
  font-size: 0.7rem;
  opacity: 0.7;
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 16px;
`;

export default function EventList({
  selectedEventId,
  selectEventId,
  events,
}: Props) {
  return (
    <Wrapper>
      {events.map((p) => {
        const peopleToShow = _.filter(
          p.people,
          (person) => person.affinityToMe >= 0.5
        );
        return (
          <EventCard
            onClick={() => selectEventId(p.id)}
            selected={selectedEventId === p.id}
          >
            <h2>{p.name}</h2>
            <InfoBar>
              <div>
                {peopleToShow.map((person) => (
                  <Avatar alt="user specified self image" src={person.img} />
                ))}
              </div>
              <MinorText>
                + {p.people.length - peopleToShow.length} people
              </MinorText>
              <MinorText>{getFormattedDateString(p.starts)}</MinorText>
            </InfoBar>
          </EventCard>
        );
      })}
    </Wrapper>
  );
}
