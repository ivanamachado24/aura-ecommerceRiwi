import axios from 'axios';

export default async function UserPage({ params }) {
  const { data: user } = await axios.get(`https://api.example.com/user/${params.id}`);

  return <div>{user.name}</div>;
}