import axios from 'axios';

export const dynamic = 'force-dynamic';

export default async function NewsPage() {
  try {
    const { data: news } = await axios.get("https://api.example.com/news");

    return (
      <ul>
        {news.map((n) => (
          <li key={n.id}>{n.title}</li>
        ))}
      </ul>
    );
  } catch (error) {
    return <div>No se pudieron cargar las noticias</div>;
  }
}