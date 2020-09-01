import React from "react";
import styled from "styled-components";

import ComputationIcon from "./ComputationIcon";
import BiologicalIcon from "./BiologicalIcon";
import MechanicalIcon from "./MechanicalIcon";

import { Skills } from "../../types";

const CreditValue = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  column-gap: 1rem;
  font-size: 0.7rem;
  justify-content: space-between;
`;

const SkillRating = styled.div`
  font-size: 0.9rem;
`;

const SkillsWrapper = styled.div`
  display: grid;
  align-items: center;
  column-gap: 0.15rem;
  grid-template-columns: repeat(auto-fill, 20px);
  width: 134px;
`;

type Props = {
  skills: Skills;
  credits: number;
  creditsPerHour: number;
};

const StatusBar = ({ skills, credits, creditsPerHour }: Props) => {
  return (
    <Wrapper>
      <div>
        <label>CREDITS</label>
        <CreditValue>${credits.toLocaleString()}</CreditValue>
      </div>
      <div>
        <label>COST OF LIFE / HOUR</label>
        <CreditValue>${creditsPerHour}</CreditValue>
      </div>
      <SkillsWrapper>
        <ComputationIcon />
        <SkillRating>{skills.computation}</SkillRating>
        <BiologicalIcon />
        <SkillRating> {skills.biological}</SkillRating>
        <MechanicalIcon />
        <SkillRating>{skills.mechanical}</SkillRating>
      </SkillsWrapper>
    </Wrapper>
  );
};

export default StatusBar;
