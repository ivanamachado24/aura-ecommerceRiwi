export default async function UserPage({ params }) {
    const user = await fetch(`https://api.example.com/user/${params.id}`, {
      cache: "no-store",
    }).then((res) => res.json());
  
    return <div>{user.name}</div>;
  }