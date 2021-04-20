import { useEffect, useRef, useState } from 'react';
import DistortionImage from './component/distortionImage';
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

  return (
    <>
    <DistortionImage src={currentSrc}/>
    <main className="p-16 screen whitespace-nowrap">
      <h2 className="title" onMouseEnter={() => setCurrentSrc(img1)}>TWO FINGER</h2>
      <h2 className="title" onMouseEnter={() => setCurrentSrc(img2)}>2 FINGER AGAIN</h2>
      <h2 className="title" onMouseEnter={() => setCurrentSrc(img3)}>WHITE SHIRT</h2>
      <h2 className="title" onMouseEnter={() => setCurrentSrc(img4)}>BORN READY</h2>
      <h2 className="title" onMouseEnter={() => setCurrentSrc(img5)}>SHARK ON MY FACE</h2>
      <h2 className="title" onMouseEnter={() => setCurrentSrc(img6)}>CODE CAMP TIME</h2>
      <h2 className="title" onMouseEnter={() => setCurrentSrc(img7)}>IMAGINE HANDSOME</h2>
      <h2 className="title" onMouseEnter={() => setCurrentSrc(img8)}>TIGER SLEEP EAT</h2>
      <h2 className="title" onMouseEnter={() => setCurrentSrc(img9)}>GIVE ME TELE SCOPE</h2>
    </main>
    </>
  );
}

export default App;
