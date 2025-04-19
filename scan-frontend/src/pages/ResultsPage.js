import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import PublicationCard from '../components/Search/PublicationCard'

const ResultsPage = () => {
  const [publications, setPublications] = useState([]);
  const [offset, setOffset] = useState(0);
  const { searchResults } = useSelector(state => state.search);

  useEffect(() => {
    if (searchResults?.histograms) {
      loadInitialPublications();
    }
  }, [searchResults]);

  const loadMore = async () => {
    const newPublications = await fetchNextDocuments(offset);
    setPublications([...publications, ...newPublications]);
    setOffset(prev => prev + 10);
  };

  return (
    <div className="results-page">
      <section className="histograms">
        <Swiper
          spaceBetween={20}
          slidesPerView={3}
          navigation
        >
          {searchResults?.histograms.map((histogram, index) => (
            <SwiperSlide key={index}>
              <div className="histogram-card">
                <h3>{histogram.date}</h3>
                <p>Публикаций: {histogram.count}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="publications">
        {publications.map((pub) => (
          <PublicationCard key={pub.id} {...pub} />
        ))}

        {offset < searchResults?.total && (
          <button onClick={loadMore} className="load-more">
            Показать еще
          </button>
        )}
      </section>
    </div>
  );
};

export default ResultsPage;