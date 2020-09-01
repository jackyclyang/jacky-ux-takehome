import React from "react";
import styled from "styled-components";
import { useRoutes } from "hookrouter";

import MainView from "./EDIT_HERE";

const routes = {
  "/": () => <Instructions />,
  "/view": () => <View />,
};

const Wrapper = styled.div`
  width: 80%;
  max-width: 720px;
  text-align: center;

  h1 {
    font-weight: normal;
    margin: 3rem 0;
  }

  figcaption {
    font-size: 0.9rem;
  }

  figure {
    margin-bottom: 2rem;
  }

  p {
    margin-bottom: 2rem;
  }

  li {
    margin-left: 3rem;
    margin-bottom: 1rem;
  }

  section {
    text-align: left;
  }

  a {
    color: #fff;
  }
`;

const Instructions = () => {
  return (
    <Wrapper>
      <h1>Catching a train in torus town</h1>
      <figure>
        <img
          alt="artistic rendition of torus town"
          style={{ maxWidth: "100%" }}
          src="https://upload.wikimedia.org/wikipedia/commons/f/fc/Internal_view_of_the_Stanford_torus.jpg"
        />
        <figcaption>Attribution: Don Davis / Public domain.</figcaption>
      </figure>
      <section>
        <p>
          The year is 2144. Earth is a scorched wasteland and the few humans who
          figured out how to get along now live in the giant sky torus.
        </p>
        <p>
          Life on the torus is ... different. Every citizen must pay close
          attention to work events that spring up expectedly or unexpectedly, as
          completing these tasks is the only way to earn credits. Instead of
          taxes, citizens pay a yearly fixed rate of x credits per hour to exist
          in the torus. To be eligible for a specific job citizens must have a
          skill level rating at or above the three core competencies that every
          job is measured by: computational, biological and mechanical skills.
        </p>
        <p>
          While that sounds like a dire existence, citizens in Torus Town
          actually have much more free time than most of us do today. Planned
          events, spontaneous parties, ongoing clubs -- through the same system
          that citizens learn about jobs, they also browse their social event
          feed and migrate throughout the torus in a way that feels more nomadic
          than does modern life.
        </p>
        <p>
          Instead of different social networks, the torus brain keeps an
          'affinity score' between all its citizens that is a combination of
          real interaction data and predictive modeling. A score of 0 means 'no
          affinity' and 1 means 'perfect affinity', but in practice everyone is
          between 0.2 and 0.8.
        </p>
        <p>
          One activity that people who develop computation skills like to do for
          fun is work on new interfaces for interacting with job and social
          event data. Wearables never really took off, and everyone still uses a
          smaller standard issue tablet for all of their communication needs.
        </p>
        <p>
          You just sat down at your favorite 'coffe shop' to work on a design
          you started a few weeks ago. You've got most of it in place, and today
          you are going to work on a few of the TODOs you left for yourself. Of
          course you probably won't get them all done, but you've got 3-4 hours
          before tonight's spinach tasting. Just focus on the ones that make
          sense to you and seem doable. Have fun!
        </p>
        <p>TODO:</p>
        <ul>
          <li>
            When I click on an event in the list, the event should expand and
            show me more details about who is going to be there.
          </li>
          <li>
            The events on the donut map should have size and transparency mapped
            to how many people will be there and how far it is into the future.
            I should also be able to select an event by clicking on the donut as
            well as the list.
          </li>
          <li>
            Add a sort button to the social event list. Options might be
            chronological, affinity score (I still need to come up with the best
            way to compute based on number of people and their affinity to me)
          </li>
          <li>
            Add Tabs to the right list so users can toggle between social events
            and jobs. I also need to design the card for jobs to show the
            requirements.
          </li>
          <li>Implement a timeline view that shows events </li>
          <li>
            OR - I could just take this feed of data and make a random event
            picker. Would be cool if I spin the donut, and then when it stops it
            just tell me which event to go to.
          </li>
        </ul>
        <p>
          <span>Ready? </span>
          <a target="_blank" href="/view">
            Let's Go! →
          </a>
        </p>
      </section>
    </Wrapper>
  );
};

const BG = styled.div`
  display: grid;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
  background-size: auto;
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
    url("https://upload.wikimedia.org/wikipedia/commons/f/fc/Internal_view_of_the_Stanford_torus.jpg");
`;

const View = () => (
  <BG>
    <div
      style={{
        width: 960,
        height: 640,
      }}
    >
      <MainView />
    </div>
  </BG>
);

function App() {
  const routeResult = useRoutes(routes);
  return routeResult || <div>Page not found</div>;
}

export default App;
