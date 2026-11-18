'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleContent from '@/components/ArticleContent';
import { DEFAULT_CONTENT } from '@/data/content';
import { BLOG_POSTS } from '@/data/blogs';

export default function BlogPage() {
  const [c, setC] = useState(DEFAULT_CONTENT);
  const [posts, setPosts] = useState(BLOG_POSTS);
  const [activeArticle, setActiveArticle] = useState(null);

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setC((prev) => ({ ...prev, ...d.content }));
      })
      .catch(() => {});

    fetch('/api/blogs')
      .then((r) => r.json())
      .then((d) => {
        if (d.success && Array.isArray(d.blogs) && d.blogs.length > 0) {
          setPosts(d.blogs);
        }
      })
      .catch(() => {});
  }, []);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (activeArticle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [activeArticle]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveArticle(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  const featured = posts.find((p) => p.isFeatured) || posts[0];
  const trending = posts.filter((p) => p.isTrending).slice(0, 4);
  const allGridPosts = posts.filter((p) => !p.isFeatured && !p.isTrending);

  const totalPages = Math.ceil(allGridPosts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentGridPosts = allGridPosts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <>
      <Header c={c} />

      <main style={{ background: '#FAFAF8', minHeight: '100vh' }}>
        {/* Page Hero with Background Video & Brand Overlay */}
        <section className="services-hub-hero">
          {/* Background Video with Real Estate Towers & Overlay */}
          <div className="hero-video-wrap" aria-hidden="true">
            <video
              className="hero-video-bg"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            >
              <source src="/hero-properties.mp4" type="video/mp4" />
            </video>
            <div className="hero-video-overlay" />
          </div>

          <div className="container">
            <div className="services-hub-hero-inner">
              <h1 className="services-hub-title">
                Real Estate News &amp; Blogs
              </h1>
            </div>
          </div>
        </section>

        {/* Standard Subtitle under Hero */}
        <div className="page-hero-subtitle-wrap" style={{ paddingTop: '36px' }}>
          <p className="page-hero-subtitle">
            Stay informed with the latest market developments, real estate intelligence, and strategic growth insights from our team.
          </p>
        </div>

        {/* Magazine Layout Container */}
        <div className="blog-hub-container" style={{ paddingTop: '16px' }}>
          {/* Top Magazine Section: 1 Featured (Left 60%) + 3 Trending Stacked (Right 40%) */}
          <section className="blog-magazine-hero">
            {/* Left: Main Featured Article */}
            <article
              className="blog-featured-card"
              onClick={() => setActiveArticle(featured)}
            >
              <div className="blog-featured-img-wrap">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="blog-featured-img"
                  loading="eager"
                />
              </div>
              <div className="blog-featured-content">
                <div className="blog-meta-line">
                  <span>Featured Analysis</span>
                  <span className="blog-meta-dot">·</span>
                  <span>{featured.date}</span>
                  <span className="blog-meta-dot">·</span>
                  <span>{featured.readTime}</span>
                </div>
                <h2 className="blog-featured-title">{featured.title}</h2>
                <p className="blog-featured-excerpt">{featured.excerpt}</p>
                <div className="blog-read-link">
                  <span>Read Full Analysis</span>
                  <span>→</span>
                </div>
              </div>
            </article>

            {/* Right: 3 Trending Articles Stacked */}
            <aside className="blog-trending-column">
              <div className="blog-trending-header">
                Trending Market Stories
              </div>
              {trending.map((post) => (
                <div
                  key={post.id}
                  className="blog-trending-item"
                  onClick={() => setActiveArticle(post)}
                >
                  <div className="blog-trending-thumb-wrap">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="blog-trending-thumb"
                      loading="lazy"
                    />
                  </div>
                  <div className="blog-trending-info">
                    <div className="blog-trending-meta">
                      {post.date} · {post.readTime}
                    </div>
                    <h3 className="blog-trending-title">{post.title}</h3>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--green)' }}>
                      Read Story →
                    </div>
                  </div>
                </div>
              ))}
            </aside>
          </section>

          {/* Bottom Section: Grid of Articles with Pagination */}
          <section id="blog-grid-section">
            <div className="blog-grid-header">
              <h3>Latest Articles &amp; Market Updates</h3>
            </div>

            <div className="blog-cards-grid">
              {currentGridPosts.map((post) => (
                <article
                  key={post.id}
                  className="blog-card"
                  onClick={() => setActiveArticle(post)}
                >
                  <div className="blog-card-img-wrap">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="blog-card-img"
                      loading="lazy"
                    />
                  </div>
                  <div className="blog-card-body">
                    <div className="blog-card-meta">
                      {post.date} · {post.readTime}
                    </div>
                    <h4 className="blog-card-title">{post.title}</h4>
                    <p className="blog-card-excerpt">{post.excerpt}</p>
                    <div className="blog-read-link">
                      <span>Read Article</span>
                      <span>→</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <nav className="blog-pagination" aria-label="Blog pagination">
                <button
                  type="button"
                  className="blog-page-nav-btn"
                  disabled={currentPage === 1}
                  onClick={() => {
                    setCurrentPage((prev) => Math.max(1, prev - 1));
                    const el = document.getElementById('blog-grid-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  ← Previous
                </button>

                <div className="blog-page-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                    <button
                      key={num}
                      type="button"
                      className={`blog-page-num-btn ${currentPage === num ? 'is-active' : ''}`}
                      onClick={() => {
                        setCurrentPage(num);
                        const el = document.getElementById('blog-grid-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      {num}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  className="blog-page-nav-btn"
                  disabled={currentPage === totalPages}
                  onClick={() => {
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
                    const el = document.getElementById('blog-grid-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Next →
                </button>
              </nav>
            )}
          </section>
        </div>
      </main>

      {/* Interactive Full Article Reader Modal */}
      {activeArticle && (
        <div
          className="blog-modal-overlay"
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="blog-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="blog-modal-close-btn"
              onClick={() => setActiveArticle(null)}
              aria-label="Close article"
            >
              ✕
            </button>

            <div className="blog-modal-header">
              <div className="blog-modal-meta">
                {activeArticle.date} · {activeArticle.readTime}
              </div>
              <h2 className="blog-modal-title">{activeArticle.title}</h2>
            </div>

            <img
              src={activeArticle.image}
              alt={activeArticle.title}
              className="blog-modal-img"
            />

            {/* Article Body */}
            <div className="blog-modal-body">
              <ArticleContent content={activeArticle.fullContent} />
            </div>

            <div style={{ marginTop: '36px', paddingTop: '20px', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                className="career-submit-btn"
                style={{ width: 'auto', padding: '10px 24px' }}
                onClick={() => setActiveArticle(null)}
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer c={c} />
    </>
  );
}
