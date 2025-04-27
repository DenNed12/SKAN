import React, { useState, useEffect } from 'react';
import { useSelector} from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { fetchDocuments } from '../api/searchAPI';
import PublicationCard from '../components/Search/PublicationCard';
import './results.css';

const ResultsPage = () => {

  const [publications, setPublications] = useState([]);
  const [offset, setOffset] = useState(0);
  const { searchParams, histograms, total } = useSelector(state => state.search);
  const [isLoading, setIsLoading] = useState(false);

  // Загрузка начальных данных
  useEffect(() => {
    if (histograms && histograms.length > 0) {
      loadInitialData();
    }
  }, [histograms]);

  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      const initialDocs = await fetchDocuments({ ...searchParams, offset: 0 });
      setPublications(initialDocs);
      setOffset(10);
    } catch (error) {
      console.error('Failed to load initial data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = async () => {
    setIsLoading(true);
    try {
      const newDocs = await fetchDocuments({ ...searchParams, offset });
      setPublications([...publications, ...newDocs]);
      setOffset(prev => prev + 10);
    } catch (error) {
      console.error('Failed to load more data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="results-container">
      <h2>Результаты поиска</h2>

      <div className="histograms-section">
        <h3>Распределение публикаций</h3>
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={3}
          navigation
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
        >
          {histograms?.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="histogram-item">
                <p className="histogram-date">{item.date}</p>
                <p className="histogram-count">Публикаций: {item.count}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="publications-list">
        {publications.map(publication => (
          <PublicationCard
            key={publication.id}
            publication={publication}
          />
        ))}
      </div>

      {offset < total && (
        <button
          onClick={loadMore}
          className="load-more-btn"
          disabled={isLoading}
        >
          {isLoading ? 'Загрузка...' : 'Показать еще'}
        </button>
      )}
    </div>
  );
};

export default ResultsPage;