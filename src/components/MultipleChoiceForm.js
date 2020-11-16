import React from 'react'
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';

const getMultipleChoice = (data) => {
  return data.question.map((questionEntry, index) => {
    return (<div> <li key={index}>{questionEntry.question}</li>
      <ul>
        <li>{questionEntry.option_a}</li>
        <li>{questionEntry.option_b}</li>
        <li>{questionEntry.option_c}</li>
      </ul>
      </div>
      )
  })
}

const MultipleChoiceForm = () => {
  const GET_QUESTIONS_LIST = gql`
    query ($_eq: Int!) {
      question(where: {questionnaire_id: {_eq: $_eq}}) {
        question
        option_a
        option_b
        option_c
      }
    }`;

  const { loading, error, data } = useQuery(GET_QUESTIONS_LIST, { variables: { _eq: 2 }});
  if(loading) return <div>loading...</div>;
  if(error) {
    console.error(error);
    return <div>Error!</div>;
  } 
  return (
  <form onSubmit={(e) => {e.preventDefault();}}>
  <h2>Questionnaire</h2>
  <ul>
    {getMultipleChoice(data)}
  </ul>
  </form>);
}

export default MultipleChoiceForm;