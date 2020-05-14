import React, { useState } from 'react';
import {useSpring, animated} from 'react-spring'
import titlegen from 'titlegen';
import './App.css';

const LED_ZEPPELIN = 1;
const THE_BEATLES = 2;
const ROLLING_STONES = 3;
const KINKS = 4;
const CREAM = 5;
const PINK_FLOYD = 6;
const JIMI_HENDRIX_EXPERIENCE = 7;
const SMALL_FACES = 8;
const THE_WHO = 9;
const YARDBIRDS = 10;
const FLEETWOOD_MAC = 11;
const MODERN_APES = 12;

const singers = [
  { name: 'Robert Plant', band: LED_ZEPPELIN, img: 'https://img.discogs.com/Ab5J6BzOB2_HbdvPp8VuNAHQGHM=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-180586-1224833592.jpeg.jpg ' },
  { name: 'Paul McCartney', band: THE_BEATLES, img: 'https://img.discogs.com/wOuYlvprIWzpEOkiXe2aZqI3vuQ=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-35301-1319382618.jpeg.jpg' },
  { name: 'John Lennon', band: THE_BEATLES, img: 'https://img.discogs.com/J19UWxyuyProuiwhaQSfzeDUchM=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-46481-1286626601.jpeg.jpg' },
  { name: 'George Harrison', band: THE_BEATLES, img: 'https://img.discogs.com/wM5FTSbXsQ08t8vVk41gQPpvquQ=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-243955-1528424000-6357.jpeg.jpg' },
  { name: 'Mick Jagger', band: ROLLING_STONES, img: 'https://img.discogs.com/-lUT1G05qghHVDuZNOzQRh9RvMA=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-90541-1459472568-4498.jpeg.jpg' },
  { name: 'Ray Davies', band: KINKS, img: 'https://img.discogs.com/LaWPbBA5du0Ya9SrUfsxechBrEk=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-58132-1450547278-6775.jpeg.jpg' },
  { name: 'Jack Bruce', band: CREAM, img: 'https://img.discogs.com/lZdXgyIsw9OVZ7JqJFbjlGugPHQ=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-106909-1456930801-9498.jpeg.jpg' },
  { name: 'Eric Clapton', band: CREAM, img: 'https://img.discogs.com/tP3UffiF2VrBEOTJUIPQaYFefU4=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-17827-1403015323-4525.jpeg.jpg' },
  { name: 'Syd Barrett', band: PINK_FLOYD, img: 'https://img.discogs.com/AbaH4Rh8niXsdGLxDvMbWexqFls=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-178489-1128224435.jpeg.jpg' },
  { name: 'Steve Marriott', band: SMALL_FACES, img: 'https://img.discogs.com/US4lTsfbbLVFyK_w_Oka7fAGM1I=/300x300/smart/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-272901-1441464992-5632.jpeg.jpg' },
  { name: 'Roger Daltrey', band: THE_WHO, img: 'https://img.discogs.com/ydE_G-xF8YrAt2V0b2JJNIBKQAM=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-266348-1362508825-5035.jpeg.jpg' },
  { name: 'Peter Green', band: FLEETWOOD_MAC, img: 'https://img.discogs.com/v0dZ9JhqH3OYS5BseHVYGI4HUts=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-76045-1252670883.jpeg.jpg' },
  { name: 'Matt Swan', band: MODERN_APES, img: '' },
];

const guitarists = [
  { name: 'Jimmy Page', band: LED_ZEPPELIN, img: 'https://img.discogs.com/3KlzNwPcRoOSsp1p284vLCgEfxc=/300x300/smart/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-180585-1450443818-9648.jpeg.jpg' },
  { name: 'George Harrison', band: THE_BEATLES, img: 'https://img.discogs.com/wM5FTSbXsQ08t8vVk41gQPpvquQ=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-243955-1528424000-6357.jpeg.jpg' },
  { name: 'Keith Richards', band: ROLLING_STONES, img: 'https://img.discogs.com/txt0WvY6ZordHGtrj0ToX8pwYXk=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-166570-1477866164-7040.jpeg.jpg' },
  { name: 'Mick Taylor', band: ROLLING_STONES, img: 'https://img.discogs.com/7K8DecdmZajh1J8D5DBzV1awCdc=/300x300/smart/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-300117-1507830181-6641.jpeg.jpg' },
  { name: 'Dave Davies', band: KINKS, img: 'https://img.discogs.com/PW7zM-nSpGUfsnUp1c1orLGHqPs=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-267809-1107281004.jpg.jpg' },
  { name: 'Eric Clapton', band: CREAM, img: 'https://img.discogs.com/tP3UffiF2VrBEOTJUIPQaYFefU4=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-17827-1403015323-4525.jpeg.jpg' },
  { name: 'Jimi Hendrix', band: JIMI_HENDRIX_EXPERIENCE, img: 'https://img.discogs.com/eHkE1RPkW5yhDCtUosNXYRZiOD4=/300x300/smart/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-110593-1581356794-4215.jpeg.jpg' },
  { name: 'Dave Gilmour', band: PINK_FLOYD, img: 'https://img.discogs.com/dMvVEeiyIRQ7_vs4Bss6aWawtR0=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-110863-1222552771.jpeg.jpg' },
  { name: 'Steve Marriott', band: SMALL_FACES, img: 'https://img.discogs.com/US4lTsfbbLVFyK_w_Oka7fAGM1I=/300x300/smart/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-272901-1441464992-5632.jpeg.jpg' },
  { name: 'Pete Townsend', band: THE_WHO, img: 'https://img.discogs.com/BofGbgu5tyNLr1jGGKq13smgY18=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-190958-1100648407.jpg.jpg' },
  { name: 'Jeff Beck', band: YARDBIRDS, img: 'https://img.discogs.com/4mvzTuy3WwFxYPK52PPoPZ5D_zI=/300x300/smart/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-49624-1455586708-6099.jpeg.jpg' },
  { name: 'Peter Green', band: FLEETWOOD_MAC, img: 'https://img.discogs.com/v0dZ9JhqH3OYS5BseHVYGI4HUts=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-76045-1252670883.jpeg.jpg' },
  { name: 'Wilko', band: MODERN_APES, img: '' },
];

const drummers = [
  { name: 'John Bonham', band: LED_ZEPPELIN, img: 'https://img.discogs.com/bhtuijn3bzJ7V4nNNPSQbfM63zg=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-457468-1143902270.jpeg.jpg' },
  { name: 'Ringo Starr', band: THE_BEATLES, img: 'https://img.discogs.com/FhZ8wk6KJnMs_I95dpas83R2IP8=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-259352-1528423774-1519.jpeg.jpg' },
  { name: 'Charlie Watts', band: ROLLING_STONES, img: 'https://img.discogs.com/ZBA6D-b5Ln_R7yVhq0GnuppUnBw=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-299325-1562280061-7191.jpeg.jpg' },
  { name: 'Ginger Baker', band: CREAM, img: 'https://img.discogs.com/etCwlvvmp1kHhOBQdEYJqVjM4yE=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-219243-1457282612-4167.jpeg.jpg' },
  { name: 'Mitch Mitchell', band: JIMI_HENDRIX_EXPERIENCE, img: 'https://img.discogs.com/HQ5OiKpJ-v7XY4NmUa8eYajxKzU=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-252849-1130375279.jpeg.jpg' },
  { name: 'Nick Mason', band: PINK_FLOYD, img: 'https://img.discogs.com/vVxWv0Kut_vgZY6q6HBmcCd477s=/300x300/smart/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-246097-1345122151-3979.jpeg.jpg' },
  { name: 'Kenney Jones', band: SMALL_FACES, img: 'https://img.discogs.com/sg9ftIxPQWy45N-HKh-o-U93YHM=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-176121-1584541082-1380.jpeg.jpg' },
  { name: 'Keith Moon', band: THE_WHO, img: 'https://img.discogs.com/ibNwNN-A7MGk_rSas5K8JecYjZ4=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-259772-1423688398-3013.jpeg.jpg' },
  { name: 'Mick Fleetwood', band: FLEETWOOD_MAC, img: 'https://img.discogs.com/u5njGONRv5nH5PCIndqjvpE2rsk=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-273841-1492349177-8552.jpeg.jpg' },
  { name: 'Jack', band: MODERN_APES, img: '' },
];

const bassists = [
  { name: 'John Paul Jones', band: LED_ZEPPELIN, img: 'https://img.discogs.com/r9BVkFUsQd_IfSCWivRTTtV9S5o=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-60149-1581433296-7527.jpeg.jpg' },
  { name: 'Paul McCartney', band: THE_BEATLES, img: 'https://img.discogs.com/wOuYlvprIWzpEOkiXe2aZqI3vuQ=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-35301-1319382618.jpeg.jpg' },
  { name: 'Bill Wyman', band: ROLLING_STONES, img: 'https://img.discogs.com/fWkAhXFTg6ZjBrL336zkwBxpGng=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-272814-1355670491-2787.jpeg.jpg' },
  { name: 'Jack Bruce', band: CREAM, img: 'https://img.discogs.com/lZdXgyIsw9OVZ7JqJFbjlGugPHQ=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-106909-1456930801-9498.jpeg.jpg' },
  { name: 'Noel Redding', band: JIMI_HENDRIX_EXPERIENCE, img: 'https://img.discogs.com/uDgx4N-lVIFjaR0t1rhKAYzS9ws=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-252848-1213505492.jpeg.jpg' },
  { name: 'Roger Waters', band: PINK_FLOYD, img: 'https://img.discogs.com/ndIexqqGbodvEJBAD-ZkNN-u8Ss=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-110862-1345124175-5586.jpeg.jpg' },
  { name: 'Ronnie Lane', band: SMALL_FACES, img: 'https://img.discogs.com/S1RYGwktY_0iq_rUXG143qA-39s=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-268088-1472486492-2599.jpeg.jpg' },
  { name: 'John Entwistle', band: THE_WHO, img: 'https://img.discogs.com/H3_O4VTUHJRShy9dR6fErI0rVDA=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-259770-1341954241-7650.jpeg.jpg' },
  { name: 'Paul Samwell-Smith', band: YARDBIRDS, img: 'https://img.discogs.com/C3_kHGPixBsI8H6O7EUFVGakU1I=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-274221-1193778875.jpeg.jpg' },
  { name: 'John McVie', band: FLEETWOOD_MAC, img: 'https://img.discogs.com/n1d418UKKTnXitW0Qdz929tOf1g=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-273840-1492348553-2932.jpeg.jpg' },
  { name: 'Bob', band: MODERN_APES, img: '' },
];

const bands = {
  [LED_ZEPPELIN]: 'Led Zeppelin',
  [THE_BEATLES]: 'The Beatles',
  [ROLLING_STONES]: 'Rolling Stones',
  [KINKS]: 'The Kinks',
  [CREAM]: 'Cream',
  [PINK_FLOYD]: 'Pink Floyd',
  [JIMI_HENDRIX_EXPERIENCE]: 'The Jimi Hendrix Experience',
  [SMALL_FACES]: 'The Small Faces',
  [THE_WHO]: 'The Who',
  [YARDBIRDS]: 'Yardbirds',
  [FLEETWOOD_MAC]: 'Fleetwood Mac',
  [MODERN_APES]: 'The Modern Apes',
};

function App() {
  const SINGER = 0;
  const GUITAR = 1;
  const DRUMMER = 2;
  const BASS = 3;

  const [selections, setSelections] = useState([]);

  let pick;
  let list = [];

  const reset = () => {
    setSelections([]);
  };

  const handleClick = (index) => {
    if (!selections[SINGER]) {
      setSelections([singers[index]]);
    } else if (!selections[GUITAR]) {
      setSelections([...selections, guitarists[index]]);
    } else if (!selections[DRUMMER]) {
      setSelections([...selections, drummers[index]]);
    } else {
      setSelections([...selections, bassists[index]]);
    }
  };

  if (!selections[SINGER]) {
    pick = 'singer';
    list = singers;
  } else if (!selections[GUITAR]) {
    pick = 'guitarist';
    list = guitarists;
  } else if (!selections[DRUMMER]) {
    pick = 'drummer';
    list = drummers;
  } else if (!selections[BASS]) {
    pick = 'bass player';
    list = bassists;
  }

  let name = '';

  console.log('singer', selections[SINGER]);
  console.log('guitar', selections[GUITAR]);
  console.log('drummer', selections[DRUMMER]);
  console.log('bass', selections[BASS]);

  if (selections.length === 4) {
    const feed = [
      bands[selections[SINGER].band],
      bands[selections[GUITAR].band],
      bands[selections[DRUMMER].band],
      bands[selections[BASS].band],
    ];

    console.log('feed', feed);
    const reduced = feed.reduce((acc, band) => {
      if (band in acc) {
        acc[band]++;
      } else {
        acc[band] = 1;
      }

      return acc;
    }, {});

    const bandsWeighted = Object.keys(reduced).sort(function (a, b) {
      return reduced[b] - reduced[a];
    });

    let noun;
    if (bandsWeighted.find((band) => band === 'The Beatles')) {
      noun = 'Beatles';
    }
    const adjective = []; // e.g. Experienced
    const spare = [];

    console.log('bandsWeighted', bandsWeighted);

    if (bandsWeighted.length > 1) {
      for (let i = 0; i < 2 + bandsWeighted.length; i++) {
        const band = bandsWeighted[i];
        //const parts = band.split(' ');

        switch (band) {
          case 'The Jimi Hendrix Experience':
            if (!noun) {
              noun = 'Experience';
            } else {
              adjective.push('Experienced');
            }
            break;
          case 'The Yardbirds':
            if (!noun) {
              noun = 'Yardbirds';
            } else {
              adjective.push('Yardbird');
            }
            break;
          case 'The Kinks':
            if (!noun) {
              noun = 'Kinks';
            } else {
              adjective.push('Kinky');
            }
            break;
          case 'Cream':
            if (!noun) {
              noun = 'Cream';
            } else {
              adjective.push('Creamy');
            }
            break;
          case 'Pink Floyd':
            if (!noun) {
              noun = 'Floyd';
            } else {
              adjective.push('Pink');
            }
            break;
          case 'Led Zeppelin':
            if (!noun) {
              noun = 'Zeppelin';
            } else {
              adjective.push('Led');
            }
            break;
          case 'Rolling Stones':
            if (!noun) {
              noun = 'Stones';
            } else {
              adjective.push('Rolling');
            }
            break;
          case 'The Small Faces':
            if (!noun) {
              noun = 'Faces';
            } else {
              adjective.push('Small');
            }
            break;
          case 'Fleetwood Mac':
            if (!noun) {
              noun = 'Mac';
            } else {
              spare.push('Fleetwood');
            }
            break;
          case 'The Modern Apes':
            if (!noun) {
              noun = 'Apes';
            } else {
              adjective.push('Modern');
            }
            break;
          case 'The Who':
            if (!noun) {
              noun = 'Who';
            } else {
              spare.push('Who');
            }
            break;
          case 'Beatles':
            // already done you
            break;
          default:
            break;
        }
      }

      console.log('noun=', noun);
      console.log('adjec=', adjective);
      console.log('spare', spare);

      name = `The ${adjective.join(' ')} ${noun}`;

      if (spare.length) {
        name = `${name} of ${spare.join(' ')}`;
      }
    } else {
      name = `erm... ${bandsWeighted[0]}`;
    }
  }

  return (
    <div className="App">
      <header className="App-header"></header>
      <div className="App-img-container">
        {selections[SINGER] && <img src={selections[SINGER].img} alt={selections[SINGER].name}></img>}
        {selections[GUITAR] && <img src={selections[GUITAR].img} alt={selections[GUITAR].name}></img>}
        {selections[DRUMMER] && <img src={selections[DRUMMER].img} alt={selections[DRUMMER].name}></img>}
        {selections[BASS] && <img src={selections[BASS].img} alt={selections[BASS].name}></img>}
      </div>
      {pick && `Pick your ${pick}`}
      <ul>
        {list.map((item, index) => (
          <li key={index} value={item} onClick={() => handleClick(index)}>
            {item.name}
          </li>
        ))}
      </ul>
      {name !== '' && `You formed ${name}`}
      {!list.length && <button onClick={() => reset()}>Reform!</button>}
    </div>
  );
}

export default App;
