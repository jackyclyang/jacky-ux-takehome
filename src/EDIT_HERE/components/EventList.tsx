import React from "react";
import _ from "lodash";
import styled from "styled-components";
import ComputationIcon from "./status-bar/ComputationIcon";
import BiologicalIcon from "./status-bar/BiologicalIcon";
import MechanicalIcon from "./status-bar/MechanicalIcon";
import { getFormattedDateString } from "../utils";
import { Event, Job } from "../types";


type Props = {
  selectedEventId?: string;
  selectEventId: Function;
  events: Event[];
  setEvents: Function;
  jobs: Job[];
  setJobs: Function;
  social: boolean;
  setSocial: Function
};

const Wrapper = styled.div`
  overflow-y: auto;
  padding: 0.5rem;
  flex-grow: 1;
  align-content: stretch;
  display: flex;
  flex-direction: column;
`;

const SkillsWrapper = styled.div`
  display: grid;
  align-items: center;
  column-gap: 0.15rem;
  grid-template-columns: repeat(auto-fill, 20px);
  width: 134px;
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
  setEvents,
  jobs,
  setJobs,
  social,
  setSocial
}: Props) {


  const sort = (e) => {
    let value = e.target.value
    let data = events.slice()

    if (value === "a-z") {
      events.sort(function (a, b) {
        if (a.starts < b.starts) {
          return -1
        }
        else if (a.starts > b.starts) {
          return 1
        }
        else {
          return 0
        }
      })
    }
    if (value === "1-10") {
      events.sort(function (a, b) {
        if (a.people.length < b.people.length) {
          return -1
        }
        else if (a.people.length > b.people.length) {
          return 1
        }
        else {
          return 0
        }
      })
    }
    if (value === "10-1") {
      events.sort(function (a, b) {
        if (a.people.length < b.people.length) {
          return 1
        }
        else if (a.people.length > b.people.length) {
          return -1
        }
        else {
          return 0
        }
      })
    }
    if (value === "affinity10") {
      events.sort(function (a, b) {
        let affinityArray = a.people.map((person) => person.affinityToMe)
        let affinitySum = 0

        for (let i = 0; i < affinityArray.length; i++) {
          affinitySum += affinityArray[i]
        }

        let affinityAverageA = affinitySum / affinityArray.length

        affinityArray = b.people.map((person) => person.affinityToMe)
        affinitySum = 0

        for (let i = 0; i < affinityArray.length; i++) {
          affinitySum += affinityArray[i]
        }

        let affinityAverageB = affinitySum / affinityArray.length

        if (affinityAverageA < affinityAverageB) {
          return 1
        }
        else if (affinityAverageA > affinityAverageB) {
          return -1
        }
        else {
          return 0
        }
      })
    }
    setEvents(data)

  }


  const filter = (e) => {
    let value = e.target.value

    let parent = e.target.parentElement;
    let children = parent.children

    children[0].className = "tab-links"
    children[1].className = "tab-links"

    if (value === "social") {
      setSocial(true)
      e.target.className += " active"
    }
    else if (value === "work") {
      setSocial(false)
      e.target.className += " active"
    }
  }


  return (
    <Wrapper>
      <div className="tabs">
        <button className="tab-links" value="social" onClick={filter}>Social Events</button>
        <button className="tab-links" value="work" onClick={filter}>Jobs</button>
      </div >
      {
        social ?
          <>
            <form className="sort-form">
              <label id="sort-label">SORT BY: </label>
              <select name="sort" id="sort" onChange={sort}>
                <option selected disabled> - Select - </option>
                <option value="a-z" >Chronologically</option>
                <option value="1-10" >Group Size, Smallest to Largest</option>
                <option value="10-1" >Group Size, Largest to Smallest</option>
                <option value="affinity10">Average Affinity To Me, High to Low</option>
              </select>
            </form>

            {events.map((p) => {
              let peopleToShow = _.filter(
                p.people,
                (person) => person.affinityToMe >= 0.5
              );

              return (
                <>
                  <EventCard
                    onClick={() => {
                      selectEventId(p.id)
                    }}
                    selected={selectedEventId === p.id}
                  >
                    <h2 >{p.name}</h2>
                    <InfoBar>
                      {selectedEventId === p.id ?
                        <><div>
                          {p.people.map((person) => (
                            <Avatar alt="user specified self image" src={person.img} />
                          ))}
                        </div>
                          <br />
                        </> : <>
                          <div>
                            {peopleToShow.map((person) => (
                              <Avatar alt="user specified self image" src={person.img} />
                            ))}
                          </div>
                          <MinorText>
                            + {p.people.length - peopleToShow.length} people
                          </MinorText>
                        </>}
                      <MinorText>{getFormattedDateString(p.starts)}</MinorText>
                    </InfoBar>
                  </EventCard>
                </>
              )
            })
            }
          </>
          :
          <>
            {jobs.map((p) => {
              return (
                <EventCard
                  onClick={() => {
                    selectEventId(p.id)
                  }}
                  selected={selectedEventId === p.id}
                >
                  <h2>{p.id} |  Credits:{p.credits}</h2>
                  <InfoBar>
                    <SkillsWrapper>
                      <ComputationIcon /> {p.skillReqs.computation}   <BiologicalIcon /> {p.skillReqs.biological}  <MechanicalIcon /> {p.skillReqs.mechanical}
                    </SkillsWrapper>
                    <br />
                    <MinorText>{getFormattedDateString(p.latestStartDate)}</MinorText>
                  </InfoBar>
                </EventCard>
              );
            })}
          </>
      }
    </Wrapper >
  );
}
