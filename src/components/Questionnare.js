import React from 'react'
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';

const getQuestionnares = (data) => {
  return data.questionnaire.map((questionnaireEntry,index) => {
    return <li key={index}><button>{questionnaireEntry.questionnaire_name}</button></li>
  })
}

const Questionnare = () => {
  const GET_QUESTIONNARE_LIST = gql`
    query {
      questionnaire {
        questionnaire_name
      }
    }`;

  const { loading, error, data } = useQuery(GET_QUESTIONNARE_LIST);
  if(loading) return <div>loading...</div>;
  if(error) {
    console.error(error);
    return <div>Error!</div>;
  } 
  return (
  <>
  <h2>Hello. Which questionnaire would you like to take?</h2>
  <ul>
    {getQuestionnares(data)}
  </ul>
  </>);
}

export default Questionnare;