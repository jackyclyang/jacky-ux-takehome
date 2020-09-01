import React, { useState } from "react";
import styled from "styled-components";

import data from "../data";

import Donut from "./Donut";
import EventList from "./EventList";
import Timeline from "./Timeline";
import StatusBar from "./status-bar";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  color: #ddd;
  display: grid;
  box-sizing: border-box;

  grid-template-columns: auto 1fr;
  box-shadow: 0px 4px 40px 4px rgba(0, 0, 0, 0.9);
  background-color: #111;
  p {
    margin-bottom: 1rem;
  }
  li {
    margin-left: 2rem;
    margin-bottom: 1rem;
  }
  label {
    font-size: 0.7rem;
    opacity: 0.8;
  }
`;

const LeftPanel = styled.section`
  background-color: #222;
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin: 0.5rem 0 0.5rem 0.5rem;
  display: flex;
  flex-direction: column;
`;

const EditThisComponent = () => {
  const [selectedEventId, selectEventId] = useState();

  return (
    <Wrapper>
      <LeftPanel>
        <StatusBar
          skills={data.skills}
          credits={data.credits}
          creditsPerHour={data.creditsPerHour}
        />
        <Donut
          parties={data.parties}
          width={520}
          height={520}
          currentArc={data.currentArc}
          currentRadius={data.currentRadius}
          selectedEventId={selectedEventId}
        />
        <Timeline />
      </LeftPanel>
      <EventList
        selectedEventId={selectedEventId}
        selectEventId={(id: string) =>
          selectEventId(id === selectedEventId ? null : id)
        }
        events={data.parties}
      />
    </Wrapper>
  );
};

export default EditThisComponent;
