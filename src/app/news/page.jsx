export const dynamic = 'force-dynamic';

export default async function NewsPage() {
  try {
    const news = await fetch("https://api.example.com/news", {
      next: { revalidate: 60 },
    }).then((res) => res.json());

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