
import './App.css';
import LoginButton from './components/LoginButton.js';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';
import { useAuth0 } from '@auth0/auth0-react';
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';
import Questionnare from './components/Questionnare';
import MultipleChoiceForm from './components/MultipleChoiceForm';

 const createApolloClient = (authToken) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: 'https://sought-pig-38.hasura.app/v1/graphql',
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }),
    cache: new InMemoryCache(),
  });
 };

function App() {
  const { isLoading } = useAuth0();
  const client = createApolloClient();
  if(isLoading) return <div>Loading...</div>
  return (
    <ApolloProvider client={client}>
      <LoginButton />
      <LogoutButton />
      <Profile />
      <Questionnare />
      <MultipleChoiceForm />
    </ApolloProvider>
  );
}

export default App;
