import React from "react";

import { Event, Job } from "../types";

type Props = {
  parties: Event[];
  selectedEventId?: string;
  selectEventId: Function;
  jobs: Job[];
  social: boolean
};

export default function Timeline(
  {
    parties = [],
    selectedEventId,
    selectEventId,
    jobs = [],
    social

  }: Props
) {

  const chooseRandom = () => {
    if (social) {
      let random = Math.floor(Math.random() * parties.length) + 1
      console.log(random)
      selectEventId(parties[random].id)
    }
    else {
      let random = Math.floor(Math.random() * jobs.length) + 1
      selectEventId(jobs[random].id)
    }
  }


  return (
    <div
      style={{
        backgroundColor: "#060606",
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "0.5rem",
      }}
    >
      <button className="random-button" onClick={chooseRandom}>
        Choose Random
    </button>
    </div>
  )
}




