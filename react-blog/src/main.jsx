import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import posts from "./data/posts.json";
import "./styles.css";

function Header({ search, setSearch }) {
  return (
    <header className="header">
      <div className="wrap nav">
        <a className="logo" href="#">Dev<span>Notes</span></a>
        <input
          className="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search posts..."
          aria-label="Search posts"
        />
      </div>
    </header>
  );
}

function Footer() {
  return <footer className="footer">Built with React · Week 1 Frontend Fundamentals</footer>;
}

function Button({ children, active = false, onClick }) {
  return (
    <button className={`filter-btn ${active ? "active" : ""}`} onClick={onClick}>
      {children}
    </button>
  );
}

function Card({ post }) {
  return (
    <article className="card">
      <div className="card-top">
        <span className="badge">{post.category}</span>
        <span>{post.readTime}</span>
      </div>
      <h2>{post.title}</h2>
      <p>{post.excerpt}</p>
      <div className="meta">
        <span>By {post.author}</span>
        <span>{post.date}</span>
      </div>
    </article>
  );
}

function Form() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function submit(e) {
    e.preventDefault();
    if (email.includes("@")) setSubmitted(true);
  }

  return (
    <form className="subscribe" onSubmit={submit}>
      <div>
        <strong>Get new posts</strong>
        <p>Demo form using React state.</p>
      </div>
      <div className="subscribe-controls">
        <input
          type="email"
          value={email}
          onChange={e => { setEmail(e.target.value); setSubmitted(false); }}
          placeholder="you@example.com"
          required
        />
        <button className="subscribe-btn">Subscribe</button>
      </div>
      {submitted && <small>Subscribed successfully ✓</small>}
    </form>
  );
}

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", ...new Set(posts.map(post => post.category))];

  const filteredPosts = useMemo(() => {
    const query = search.toLowerCase().trim();
    return posts.filter(post => {
      const matchesCategory = category === "All" || post.category === category;
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  return (
    <>
      <Header search={search} setSearch={setSearch} />
      <main className="wrap main">
        <section className="hero">
          <p className="eyebrow">REACT BLOG UI</p>
          <h1>Notes from the<br /><span>frontend workshop.</span></h1>
          <p>Reusable components, JSON-driven content, search and filters, all in one tidy React project.</p>
        </section>

        <section className="filters">
          <div className="filter-list">
            {categories.map(item => (
              <Button key={item} active={category === item} onClick={() => setCategory(item)}>
                {item}
              </Button>
            ))}
          </div>
          <span className="count">{filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""}</span>
        </section>

        <section className="grid">
          {filteredPosts.length ? (
            filteredPosts.map(post => <Card key={post.id} post={post} />)
          ) : (
            <div className="empty">No posts found. Your search went fishing and caught nothing. 🎣</div>
          )}
        </section>

        <Form />
      </main>
      <Footer />
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
