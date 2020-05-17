import React, { useRef, useState, useCallback } from 'react';
import { useSpring, useTransition, animated } from 'react-spring';
import titlegen from 'titlegen';
import MarkovGen from 'markov-generator';
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
  {
    name: 'Matt Ape',
    key: 13,
    band: MODERN_APES,
    img:
      'http://www.modernapes.band/wp-content/uploads/2018/10/greenmatt-960x960.jpg',
  },
  {
    key: 1,
    name: 'Robert Plant',
    band: LED_ZEPPELIN,
    img:
      'https://img.discogs.com/Ab5J6BzOB2_HbdvPp8VuNAHQGHM=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-180586-1224833592.jpeg.jpg ',
  },
  {
    key: 2,
    name: 'Paul McCartney',
    band: THE_BEATLES,
    img:
      'https://img.discogs.com/wOuYlvprIWzpEOkiXe2aZqI3vuQ=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-35301-1319382618.jpeg.jpg',
  },
  {
    key: 3,
    name: 'John Lennon',
    band: THE_BEATLES,
    img:
      'https://img.discogs.com/J19UWxyuyProuiwhaQSfzeDUchM=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-46481-1286626601.jpeg.jpg',
  },
  {
    key: 4,
    name: 'George Harrison',
    band: THE_BEATLES,
    img:
      'https://img.discogs.com/wM5FTSbXsQ08t8vVk41gQPpvquQ=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-243955-1528424000-6357.jpeg.jpg',
  },
  {
    key: 5,
    name: 'Mick Jagger',
    band: ROLLING_STONES,
    img:
      'https://img.discogs.com/-lUT1G05qghHVDuZNOzQRh9RvMA=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-90541-1459472568-4498.jpeg.jpg',
  },
  {
    key: 6,
    name: 'Ray Davies',
    band: KINKS,
    img:
      'https://img.discogs.com/LaWPbBA5du0Ya9SrUfsxechBrEk=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-58132-1450547278-6775.jpeg.jpg',
  },
  {
    key: 7,
    name: 'Jack Bruce',
    band: CREAM,
    img:
      'https://img.discogs.com/wU_3c77xbqNk1-IqB5Dd1j9su8E=/200x246/smart/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/A-106909-1084201717.jpg.jpg',
  },
  {
    key: 8,
    name: 'Eric Clapton',
    band: CREAM,
    img:
      'https://img.discogs.com/tP3UffiF2VrBEOTJUIPQaYFefU4=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-17827-1403015323-4525.jpeg.jpg',
  },
  {
    key: 9,
    name: 'Syd Barrett',
    band: PINK_FLOYD,
    img:
      'https://img.discogs.com/CQ5Siv2XYd-EF4vUfcNV21i3-mQ=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-178489-1166529358.jpeg.jpg',
  },
  {
    key: 10,
    name: 'Steve Marriott',
    band: SMALL_FACES,
    img:
      'https://img.discogs.com/US4lTsfbbLVFyK_w_Oka7fAGM1I=/300x300/smart/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-272901-1441464992-5632.jpeg.jpg',
  },
  {
    key: 11,
    name: 'Roger Daltrey',
    band: THE_WHO,
    img:
      'https://img.discogs.com/ydE_G-xF8YrAt2V0b2JJNIBKQAM=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-266348-1362508825-5035.jpeg.jpg',
  },
  {
    key: 12,
    name: 'Peter Green',
    band: FLEETWOOD_MAC,
    img:
      'https://img.discogs.com/v0dZ9JhqH3OYS5BseHVYGI4HUts=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-76045-1252670883.jpeg.jpg',
  }
];

const guitarists = [
  {
    name: 'Wilko Ape',
    key: 33,
    band: MODERN_APES,
    img:
      'http://www.modernapes.band/wp-content/uploads/2018/10/redmatt-960x960.jpg',
  },
  {
    key: 21,
    name: 'Jimmy Page',
    band: LED_ZEPPELIN,
    img:
      'https://img.discogs.com/3KlzNwPcRoOSsp1p284vLCgEfxc=/300x300/smart/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-180585-1450443818-9648.jpeg.jpg',
  },
  {
    key: 22,
    name: 'George Harrison',
    band: THE_BEATLES,
    img:
      'https://img.discogs.com/wM5FTSbXsQ08t8vVk41gQPpvquQ=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-243955-1528424000-6357.jpeg.jpg',
  },
  {
    key: 23,
    name: 'Keith Richards',
    band: ROLLING_STONES,
    img:
      'https://img.discogs.com/txt0WvY6ZordHGtrj0ToX8pwYXk=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-166570-1477866164-7040.jpeg.jpg',
  },
  {
    key: 24,
    name: 'Mick Taylor',
    band: ROLLING_STONES,
    img:
      'https://img.discogs.com/7K8DecdmZajh1J8D5DBzV1awCdc=/300x300/smart/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-300117-1507830181-6641.jpeg.jpg',
  },
  {
    key: 25,
    name: 'Dave Davies',
    band: KINKS,
    img:
      'https://img.discogs.com/PW7zM-nSpGUfsnUp1c1orLGHqPs=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-267809-1107281004.jpg.jpg',
  },
  {
    key: 26,
    name: 'Eric Clapton',
    band: CREAM,
    img:
      'https://img.discogs.com/tP3UffiF2VrBEOTJUIPQaYFefU4=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-17827-1403015323-4525.jpeg.jpg',
  },
  {
    key: 27,
    name: 'Jimi Hendrix',
    band: JIMI_HENDRIX_EXPERIENCE,
    img:
      'https://img.discogs.com/eHkE1RPkW5yhDCtUosNXYRZiOD4=/300x300/smart/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-110593-1581356794-4215.jpeg.jpg',
  },
  {
    key: 28,
    name: 'Dave Gilmour',
    band: PINK_FLOYD,
    img:
      'https://img.discogs.com/dMvVEeiyIRQ7_vs4Bss6aWawtR0=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-110863-1222552771.jpeg.jpg',
  },
  {
    key: 29,
    name: 'Steve Marriott',
    band: SMALL_FACES,
    img:
      'https://img.discogs.com/US4lTsfbbLVFyK_w_Oka7fAGM1I=/300x300/smart/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-272901-1441464992-5632.jpeg.jpg',
  },
  {
    key: 30,
    name: 'Pete Townsend',
    band: THE_WHO,
    img:
      'https://img.discogs.com/BofGbgu5tyNLr1jGGKq13smgY18=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-190958-1100648407.jpg.jpg',
  },
  {
    key: 31,
    name: 'Jeff Beck',
    band: YARDBIRDS,
    img:
      'https://img.discogs.com/4mvzTuy3WwFxYPK52PPoPZ5D_zI=/300x300/smart/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-49624-1455586708-6099.jpeg.jpg',
  },
  {
    key: 32,
    name: 'Peter Green',
    band: FLEETWOOD_MAC,
    img:
      'https://img.discogs.com/v0dZ9JhqH3OYS5BseHVYGI4HUts=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-76045-1252670883.jpeg.jpg',
  }
];

const drummers = [
  { name: 'Jack Ape', key: 50, band: MODERN_APES, img: '' },
  {
    key: 41,
    name: 'John Bonham',
    band: LED_ZEPPELIN,
    img:
      'https://img.discogs.com/bhtuijn3bzJ7V4nNNPSQbfM63zg=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-457468-1143902270.jpeg.jpg',
  },
  {
    key: 42,
    name: 'Ringo Starr',
    band: THE_BEATLES,
    img:
      'https://img.discogs.com/FhZ8wk6KJnMs_I95dpas83R2IP8=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-259352-1528423774-1519.jpeg.jpg',
  },
  {
    key: 43,
    name: 'Charlie Watts',
    band: ROLLING_STONES,
    img:
      'https://img.discogs.com/ZBA6D-b5Ln_R7yVhq0GnuppUnBw=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-299325-1562280061-7191.jpeg.jpg',
  },
  {
    key: 44,
    name: 'Ginger Baker',
    band: CREAM,
    img:
      'https://img.discogs.com/AP5iU4iAu-0B34APysFIjB-ZIJo=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-219243-1457282532-8420.jpeg.jpg',
  },
  {
    key: 45,
    name: 'Mitch Mitchell',
    band: JIMI_HENDRIX_EXPERIENCE,
    img:
      'https://img.discogs.com/HQ5OiKpJ-v7XY4NmUa8eYajxKzU=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-252849-1130375279.jpeg.jpg',
  },
  {
    key: 46,
    name: 'Nick Mason',
    band: PINK_FLOYD,
    img:
      'https://img.discogs.com/vVxWv0Kut_vgZY6q6HBmcCd477s=/300x300/smart/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-246097-1345122151-3979.jpeg.jpg',
  },
  {
    key: 47,
    name: 'Kenney Jones',
    band: SMALL_FACES,
    img:
      'https://img.discogs.com/dHmJnDnjiMvTTAkmzHNd-rggmJs=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-176121-1152547001.jpeg.jpg',
  },
  {
    key: 48,
    name: 'Keith Moon',
    band: THE_WHO,
    img:
      'https://img.discogs.com/ibNwNN-A7MGk_rSas5K8JecYjZ4=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-259772-1423688398-3013.jpeg.jpg',
  },
  {
    key: 49,
    name: 'Mick Fleetwood',
    band: FLEETWOOD_MAC,
    img:
      'https://img.discogs.com/u5njGONRv5nH5PCIndqjvpE2rsk=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-273841-1492349177-8552.jpeg.jpg',
  }
];

const bassists = [
  {
    name: 'Bob Ape',
    key: 71,
    band: MODERN_APES,
    img:
      'http://www.modernapes.band/wp-content/uploads/2018/10/yellowbob-960x960.jpg',
  },
  {
    key: 61,
    name: 'John Paul Jones',
    band: LED_ZEPPELIN,
    img:
      'https://img.discogs.com/r9BVkFUsQd_IfSCWivRTTtV9S5o=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-60149-1581433296-7527.jpeg.jpg',
  },
  {
    key: 62,
    name: 'Paul McCartney',
    band: THE_BEATLES,
    img:
      'https://img.discogs.com/wOuYlvprIWzpEOkiXe2aZqI3vuQ=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-35301-1319382618.jpeg.jpg',
  },
  {
    key: 63,
    name: 'Bill Wyman',
    band: ROLLING_STONES,
    img:
      'https://img.discogs.com/fWkAhXFTg6ZjBrL336zkwBxpGng=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-272814-1355670491-2787.jpeg.jpg',
  },
  {
    key: 64,
    name: 'Jack Bruce',
    band: CREAM,
    img:
      'https://img.discogs.com/wU_3c77xbqNk1-IqB5Dd1j9su8E=/200x246/smart/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/A-106909-1084201717.jpg.jpg',
  },
  {
    key: 65,
    name: 'Noel Redding',
    band: JIMI_HENDRIX_EXPERIENCE,
    img:
      'https://img.discogs.com/uDgx4N-lVIFjaR0t1rhKAYzS9ws=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-252848-1213505492.jpeg.jpg',
  },
  {
    key: 66,
    name: 'Roger Waters',
    band: PINK_FLOYD,
    img:
      'https://img.discogs.com/ndIexqqGbodvEJBAD-ZkNN-u8Ss=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-110862-1345124175-5586.jpeg.jpg',
  },
  {
    key: 67,
    name: 'Ronnie Lane',
    band: SMALL_FACES,
    img:
      'https://img.discogs.com/UWYR9WqHVhW5Gc9arnhRMQ3Vr8U=/222x299/smart/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/A-268088-1276685503.jpeg.jpg',
  },
  {
    key: 68,
    name: 'John Entwistle',
    band: THE_WHO,
    img:
      'https://img.discogs.com/H3_O4VTUHJRShy9dR6fErI0rVDA=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-259770-1341954241-7650.jpeg.jpg',
  },
  {
    key: 69,
    name: 'Paul Samwell-Smith',
    band: YARDBIRDS,
    img:
      'https://img.discogs.com/C3_kHGPixBsI8H6O7EUFVGakU1I=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-274221-1193778875.jpeg.jpg',
  },
  {
    key: 70,
    name: 'John McVie',
    band: FLEETWOOD_MAC,
    img:
      'https://img.discogs.com/n1d418UKKTnXitW0Qdz929tOf1g=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-273840-1492348553-2932.jpeg.jpg',
  }
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

const songs = {
  [LED_ZEPPELIN]: [
    'Stairway to Heaven',
    'When the Levee Breaks',
    'Dazed and Confused',
  ],
  [THE_BEATLES]: [
    'Lucy in the Sky With Diamonds',
    'Here Comes the Sun',
    'I am the Walrus',
  ],
  [ROLLING_STONES]: [
    'Sympathy for the Devil',
    'You Can`t Always Get What You Want',
    'Under My THumb',
  ],
  [KINKS]: [
    'Dedicated Follower of Fashion',
    'All Day and All of the Night',
    'Death of a Clown',
  ],
  [CREAM]: ['Sunshine of your Love', "I'm So Glad", 'Crossroads'],
  [PINK_FLOYD]: [
    'Careful with That Axe, Eugene',
    'Shine on You Crazy Diamond',
    'Astronomy Domine',
  ],
  [JIMI_HENDRIX_EXPERIENCE]: [
    'All Along the Watchtower',
    'The Wind Cries Mary',
    'Voodoo Chile',
  ],
  [SMALL_FACES]: [
    'All or Nothing',
    'Here Comes the Nice',
    'Ogdens Nut Gone Flake',
  ],
  [THE_WHO]: ['Pictures of Lily', 'Wont Get Fooled Again'],
  [YARDBIRDS]: [
    'Train Kept a Rollin',
    'Shapes of Things',
    'Train Kept a Rollin',
  ],
  [FLEETWOOD_MAC]: ['Man of the World', 'Black Magic Woman'],
  [MODERN_APES]: ['We Are the Monkeys', 'I am an Ape Man', 'Gorilla'],
};

let pick = 'singer';

function App() {
  const ref = useRef([]);

  const SINGER = 0;
  const GUITAR = 1;
  const DRUMMER = 2;
  const BASS = 3;

  const [selections, setSelections] = useState([]);
  const [list, setList] = useState([]);

  const resetList = useCallback((newList) => {
    console.log('newList', newList);
    ref.current.map(clearTimeout);
    ref.current = [];
    setList([]);
    ref.current.push(setTimeout(() => setList([...newList]), 1000));
  }, []);

  const reset = () => {
    setSelections([]);
    pick = 'singer';
  };

  const handleClick = (name) => {
    if (!selections[SINGER]) {
      pick = 'guitarist';
      setSelections([name]);
      resetList(guitarists);
    } else if (!selections[GUITAR]) {
      pick = 'drummer';
      setSelections([...selections, name]);
      resetList(drummers);
    } else if (!selections[DRUMMER]) {
      pick = 'bass player';
      setSelections([...selections, name]);
      resetList(bassists);
    } else {
      setSelections([...selections, name]);
      resetList([]);
      pick = '';
    }
  };

  if (!selections[SINGER] && !list.length) {
    setList(singers);
  }

  let name = '';

  if (selections.length === 4) {
    const feed = [
      bands[selections[SINGER].band],
      bands[selections[GUITAR].band],
      bands[selections[DRUMMER].band],
      bands[selections[BASS].band],
    ];

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
    const adjective = []; // e.g. Experienced
    const spare = [];

    if (bandsWeighted.length > 1) {
      for (let i = 0; i < 2 + bandsWeighted.length; i++) {
        const band = bandsWeighted[i];

        switch (band) {
          case 'The Jimi Hendrix Experience':
            if (!noun) {
              noun = 'Experience';
            } else {
              adjective.push('Experienced');
            }
            break;
          case 'Yardbirds':
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
            if (!noun) {
              noun = 'Beatles';
            } else {
              adjective.push('Beatles');
            }
            break;
          default:
            break;
        }
      }

      name = `The ${adjective.join(' ')} ${noun}`;

      if (spare.length) {
        name = `${name} of ${spare.join(' ')}`;
      }
    } else {
      name = `erm... ${bandsWeighted[0]}`;
    }
  }

  const singerProps = useSpring({
    opacity: selections[SINGER] ? 1 : 0,
    height: '25vw',
    overflow: 'hidden',
    from: { opacity: 0 },
  });
  const singerImg = selections[SINGER] ? selections[SINGER].img : '';
  const singerAlt = selections[SINGER] ? selections[SINGER].name : '';
  const guitarProps = useSpring({
    opacity: selections[GUITAR] ? 1 : 0,
    height: '25vw',
    overflow: 'hidden',
    from: { opacity: 0 },
  });
  const guitarImg = selections[GUITAR] ? selections[GUITAR].img : '';
  const guitarAlt = selections[GUITAR] ? selections[GUITAR].name : '';
  const drummerProps = useSpring({
    opacity: selections[DRUMMER] ? 1 : 0,
    height: '25vw',
    overflow: 'hidden',
    from: { opacity: 0 },
  });
  const drummerImg = selections[DRUMMER] ? selections[DRUMMER].img : '';
  const drummerAlt = selections[DRUMMER] ? selections[DRUMMER].name : '';
  const bassProps = useSpring({
    opacity: selections[BASS] ? 1 : 0,
    height: '25vw',
    overflow: 'hidden',
    from: { opacity: 0 },
  });
  const bassImg = selections[BASS] ? selections[BASS].img : '';
  const bassAlt = selections[BASS] ? selections[BASS].name : '';

  const transitions = useTransition(list, (i) => i.key, {
    from: {
      opacity: 0,
      height: 0,
      innerHeight: 0,
      transform: 'perspective(600px) rotateX(0deg)',
      color: '#8fa5b6',
    },
    enter: [
      { opacity: 1, height: 30, innerHeight: 30 },
      // { transform: 'perspective(600px) rotateX(180deg)', color: '#28d79f' },
      // { transform: 'perspective(600px) rotateX(0deg)' },
    ],
    leave: [
      { color: '#c23369' },
      { innerHeight: 0 },
      { opacity: 0, height: 0 },
    ],
    // update: { color: '#28b4d7' },
  });

  return (
    <div className="App">
      <header className="App-header">Supergroup</header>
      <div className="App-img-container">
        {
          <animated.div style={singerProps}>
            <img src={singerImg} alt={singerAlt}></img>
          </animated.div>
        }
        {
          <animated.div style={guitarProps}>
            <img src={guitarImg} alt={guitarAlt}></img>
          </animated.div>
        }
        {
          <animated.div style={drummerProps}>
            <img src={drummerImg} alt={drummerAlt}></img>
          </animated.div>
        }
        {
          <animated.div style={bassProps}>
            <img src={bassImg} alt={bassAlt}></img>
          </animated.div>
        }
      </div>
      {pick && <div className='prompt'>{`Pick your ${pick}`}</div>}
      {name && <div className='prompt'>You formed...</div>}
      {transitions.map(({ item, props: { innerHeight, ...rest }, key }) => {
        console.log('key', key);
        return (
          <animated.div className="transitions-item" key={key} style={rest}>
            <animated.div
              onClick={() => handleClick(item)}
              style={{ overflow: 'hidden', height: innerHeight }}
            >
              {item.name}
            </animated.div>
          </animated.div>
        );
      })}
      {name !== '' && (
          <div className='band'>{name}</div>
      )}
      {selections.length === 4 && (
        <div className='button' onClick={() => reset()}>
          Reform!
        </div>
      )}
    </div>
  );
}

export default App;
