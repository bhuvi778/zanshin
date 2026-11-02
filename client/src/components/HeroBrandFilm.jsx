import {useEffect, useRef, useState} from 'react';
import './HeroBrandFilm.css';

const film = '/films/zanshin-brand-teaser.mp4';
const poster = '/films/zanshin-brand-teaser-poster.jpg';

export default function HeroBrandFilm() {
  const video = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      const player = video.current;
      if (!player) return;
      if (preference.matches) player.pause();
      else player.play().catch(() => {}); // Keep the poster visible if autoplay is blocked.
    };
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  return <section className="zh-stage zh-brand-teaser" aria-label="Zanshin brand film">
    <video
      ref={video}
      src={film}
      poster={poster}
      muted
      playsInline
      loop
      disablePictureInPicture
      preload="auto"
      aria-label="Some Moments Deserve a Story. Zanshin brand film teaser"
      aria-describedby="hero-brand-film-description"
      onError={() => setFailed(true)}
      onCanPlay={() => setFailed(false)}
    >Your browser does not support this video. <a href={film}>Watch the Zanshin brand film</a>.</video>
    <p id="hero-brand-film-description" className="sr-only">Some Moments Deserve a Story. Our brand film is in the making. A story of fragrance, feelings and the moments that make life meaningful. Coming soon.</p>
    {failed && <div className="hero-film-error" role="status">
      <p>The film could not load.</p>
      <button type="button" onClick={() => {setFailed(false); video.current?.load();}}>Retry video</button>
    </div>}
  </section>;
}
