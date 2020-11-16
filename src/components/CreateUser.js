import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';

const getUserAnswers = (data) => {
  return data.answer.map((userAnswer,index) => {
    console.log('TESTING ', userAnswer);
    return <li key={index}>{userAnswer.answer}</li>
  })
}

const CreateUser = () => {
  const { user, isAuthenticated } = useAuth0();
  const GETANSWERS_FOR_USER = gql`
    query {
    answer(where: {user: {username: {_eq: "Ron_Swan"}}}) {
      answer
    }
  }`;

  const { loading, error, data } = useQuery(GETANSWERS_FOR_USER);
  if(loading) return <div>loading...</div>;
  if(error) {
    console.error(error);
    return <div>Error!</div>;
  } 
  return (<ul>
    {getUserAnswers(data)}
    </ul>);
}

export default CreateUser;