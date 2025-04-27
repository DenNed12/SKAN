import React from 'react';
import PropTypes from 'prop-types';
//import { Link } from 'react-router-dom';
import './card.css';

const PublicationCard = ({
  date,
  source,
  title,
  content,
  attributes,
  url
}) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderTags = () => {
    const tags = [];
    if (attributes.isTechNews) tags.push('Технические новости');
    if (attributes.isAnnouncement) tags.push('Анонсы и события');
    if (attributes.isDigest) tags.push('Сводки новостей');

    return tags.map((tag, index) => (
      <span key={index} className="tag">
        {tag}
      </span>
    ));
  };

  return (
    <article className="publication-card">
      <header className="publication-header">
        <time className="publication-date">{formatDate(date)}</time>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="publication-source"
        >
          {source.name}
        </a>
      </header>

      <h3 className="publication-title">{title}</h3>

      {attributes && (
        <div className="publication-tags">
          {renderTags()}
        </div>
      )}

      <div
        className="publication-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <footer className="publication-footer">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="read-more"
        >
          Читать в источнике
        </a>

        {attributes?.wordCount && (
          <span className="word-count">
            {attributes.wordCount} слов
          </span>
        )}
      </footer>
    </article>
  );
};

PublicationCard.propTypes = {
  date: PropTypes.string.isRequired,
  source: PropTypes.shape({
    name: PropTypes.string
  }).isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  attributes: PropTypes.shape({
    isTechNews: PropTypes.bool,
    isAnnouncement: PropTypes.bool,
    isDigest: PropTypes.bool,
    wordCount: PropTypes.number
  }),
  url: PropTypes.string.isRequired
};

export default PublicationCard;