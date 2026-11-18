'use client';
import React, { useMemo } from 'react';

/**
 * Universal Article Content Formatter:
 * Seamlessly handles:
 * 1. Pure Markdown (## H2, ### H3, **bold**, *italic*, <u>underline</u>, > quote, - bullets, 1. numbers, [link](url))
 * 2. Pure HTML (<table>, <iframe> embeds like YouTube/Maps, <div>, <p>, <strong>, <b>, <em>, <i>, <ul>, <ol>, <li>, <br>, <hr>)
 * 3. Mixed / Hybrid Markdown & HTML (e.g. Markdown text with embedded HTML tables, videos, or styled spans)
 */
export function formatArticleContent(rawContent) {
  if (!rawContent || !String(rawContent).trim()) return '';
  const text = String(rawContent).trim();

  const lines = text.split(/\r?\n/);
  const output = [];
  let currentList = null; // { type: 'ul' | 'ol', items: [] }

  const flushList = () => {
    if (currentList) {
      const tag = currentList.type;
      const itemsHtml = currentList.items
        .map((it) => `<li style="margin-bottom: 6px;">${it}</li>`)
        .join('');
      output.push(
        `<${tag} style="padding-left: 24px; margin: 14px 0; line-height: 1.75; color: #334155;">${itemsHtml}</${tag}>`
      );
      currentList = null;
    }
  };

  const processInline = (str) => {
    if (!str) return '';
    let res = str;

    // Markdown link: [label](url)
    res = res.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, label, href) => {
      let cleanHref = href.trim();
      if (!cleanHref.startsWith('http://') && !cleanHref.startsWith('https://') && !cleanHref.startsWith('/')) {
        cleanHref = `https://${cleanHref}`;
      }
      return `<a href="${cleanHref}" target="${cleanHref.startsWith('/') ? '_self' : '_blank'}" rel="noopener noreferrer" style="color: #16A34A; font-weight: 600; text-decoration: underline; text-underline-offset: 3px;">${label}</a>`;
    });

    // Markdown Bold: **text**
    res = res.replace(/\*\*([^*]+)\*\*/g, '<strong style="font-weight: 700; color: #0F172A;">$1</strong>');

    // Markdown Italic: *text* (avoiding double asterisks)
    res = res.replace(/(^|[^*])\*([^*]+)\*([^*]|$)/g, '$1<em style="font-style: italic;">$2</em>$3');

    // Markdown Code: `text`
    res = res.replace(/`([^`]+)`/g, '<code style="background: #F1F5F9; padding: 2px 6px; border-radius: 4px; font-size: 88%; color: #0F172A; font-family: monospace;">$1</code>');

    return res;
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      flushList();
      continue;
    }

    // Markdown Image: ![alt](src)
    const imgMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imgMatch) {
      flushList();
      const alt = imgMatch[1] || '';
      const src = imgMatch[2] || '';
      output.push(`<img src="${src}" alt="${alt}" style="max-width: 100%; height: auto; border-radius: 8px; margin: 18px auto; display: block;" />`);
      continue;
    }

    // Markdown Bullet list: - or *
    const bulletMatch = trimmed.match(/^[-*]\s+(.*)$/);
    if (bulletMatch && !trimmed.startsWith('<!--') && !trimmed.startsWith('</')) {
      if (!currentList || currentList.type !== 'ul') {
        flushList();
        currentList = { type: 'ul', items: [] };
      }
      currentList.items.push(processInline(bulletMatch[1]));
      continue;
    }

    // Markdown Numbered list: 1. or 2.
    const numberMatch = trimmed.match(/^\d+\.\s+(.*)$/);
    if (numberMatch) {
      if (!currentList || currentList.type !== 'ol') {
        flushList();
        currentList = { type: 'ol', items: [] };
      }
      currentList.items.push(processInline(numberMatch[1]));
      continue;
    }

    // Flush any pending list
    flushList();

    // Markdown H2: ## Heading
    if (trimmed.startsWith('## ')) {
      const headingText = processInline(trimmed.replace(/^##\s+/, ''));
      output.push(`<h2 style="font-size: 20px; font-weight: 700; color: #0F172A; margin: 28px 0 10px; line-height: 1.35;">${headingText}</h2>`);
      continue;
    }

    // Markdown H3: ### Subheading
    if (trimmed.startsWith('### ')) {
      const subheadingText = processInline(trimmed.replace(/^###\s+/, ''));
      output.push(`<h3 style="font-size: 17.5px; font-weight: 700; color: #0F172A; margin: 22px 0 8px; line-height: 1.4;">${subheadingText}</h3>`);
      continue;
    }

    // Markdown Blockquote: > Quote
    if (trimmed.startsWith('> ')) {
      const quoteText = processInline(trimmed.replace(/^>\s+/, ''));
      output.push(`<blockquote style="border-left: 4px solid #16A34A; background: #F8FAFC; padding: 12px 18px; margin: 18px 0; border-radius: 0 6px 6px 0; color: #475569; font-style: italic; line-height: 1.65;">${quoteText}</blockquote>`);
      continue;
    }

    // Markdown Horizontal Rule: --- or ***
    if (trimmed === '---' || trimmed === '***') {
      output.push(`<hr style="margin: 24px 0; border: none; border-top: 1px solid #E2E8F0;" />`);
      continue;
    }

    // If trimmed line starts with an HTML tag (e.g. <p>, <div>, <table>, <tr>, <td>, <iframe>, <ul>, <ol>, <h2>, etc. or closing tag </...>):
    if (trimmed.startsWith('<')) {
      output.push(processInline(trimmed));
      continue;
    }

    // Normal text paragraph:
    const paragraphText = processInline(trimmed);
    output.push(`<p style="margin: 12px 0; line-height: 1.78; color: #334155; font-size: 15.5px;">${paragraphText}</p>`);
  }

  flushList();
  return output.join('\n');
}

export default function ArticleContent({ content = '', className = '' }) {
  const html = useMemo(() => formatArticleContent(content), [content]);

  if (!html) return null;

  return (
    <div
      className={`article-rendered-content ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
