import { useState } from 'react';
import DistortionImage from './component/distortion-paper';
import img1 from './img/img-1.jpeg';
import img2 from './img/img-2.jpeg';
import img3 from './img/img-3.jpeg';
import img4 from './img/img-4.jpeg';
import img5 from './img/img-5.jpeg';
import img6 from './img/img-6.jpeg';
import img7 from './img/img-7.jpeg';
import img8 from './img/img-8.jpeg';
import img9 from './img/img-9.jpeg';

function App() {


  const [currentSrc, setCurrentSrc] = useState(img1);
  const content = [
    {
      id: 1,
      src: img1,
      text: 'TWO FINGER'
    },
    {
      id: 2,
      src: img2,
      text: 'DOUBLE FINGER'
    },
    {
      id: 3,
      src: img3,
      text: 'WHITE SHIRT'
    },
    {
      id: 4,
      src: img4,
      text: 'BORN READY'
    },
    {
      id: 5,
      src: img5,
      text: 'BAYBY SHARK'
    },
    {
      id: 6,
      src: img6,
      text: 'CODE TIME'
    },
    {
      id: 7,
      src: img7,
      text: 'IMAGINE HANDSOME'
    },
    {
      id: 8,
      src: img8,
      text: 'TIGER LOVER'
    },
    {
      id: 9,
      src: img9,
      text: 'GIVE ME TELE SCOPE'
    }
  ]

  const mainStyle = {
    padding: 16,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    background: '#181818'
  }

  const titleStyle = {
    cursor: 'pointer',
    color: 'white',
    textTransform: 'uppercase',
    fontSize: '4rem'
  }

  return (
    <>
      <DistortionImage src={currentSrc} />
      <main style={mainStyle}>
        {
          content.map((current, index) =>
          (
            <h2 style={titleStyle} key={current.id} onMouseEnter={() => { setCurrentSrc(current.src) }}>{current.text}</h2>
          )
          )
        }
      </main>
    </>
  );
}

export default App;
