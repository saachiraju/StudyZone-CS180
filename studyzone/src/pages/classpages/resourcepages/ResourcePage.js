import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './styles.css'; // Make sure this matches your CRA CSS import method

const fallbackIcons = {
  pdf: '/pdf-icon.png',
  ppt: '/ppt-icon.png',
  pptx: '/ppt-icon.png',
  doc: '/doc-icon.png',
  docx: '/doc-icon.png',
  txt: '/txt-icon.png',
};

export default function ClassResourcesBCOE() {
  const { courseId } = useParams();
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(`/api/blobs?folder=${courseId}`)
      .then((res) => res.json())
      .then((data) => {
        const parsed = data.urls.map((url) => ({
          label: decodeURIComponent(
            url.substring(56, url.lastIndexOf('.') - 31)
              .replaceAll('-', ' ')
          ),
          url,
        }));
        setImages(parsed);
      })
      .catch((err) => console.error('Failed to load blob links:', err));
  }, [courseId]);

  return (
    <main className="page-container">
      <h1 className="section-heading">{courseId} Resources</h1>

      {images.length === 0 ? (
        <p className="text-gray-500 text-lg">No resources available.</p>
      ) : (
        <div className="boxcontainer">
          {images.map((img, index) => {
            const ext = img.url.split('.').pop()?.toLowerCase() || '';
            const fallback = fallbackIcons[ext] || img.url;

            return (
              <div key={index} className="boxmodule">
                <div className="label">{img.label}</div>
                <a href={img.url} target="_blank" rel="noopener noreferrer">
                  <img
                    src={fallback}
                    alt={img.label}
                    className="image"
                    style={{
                      objectFit: 'cover',
                      width: fallbackIcons[ext] ? '80%' : '100%',
                      height: fallbackIcons[ext] ? '80%' : '85%',
                      margin: '0 auto',
                    }}
                  />
                </a>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
