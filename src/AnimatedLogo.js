import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const AnimatedLogo = () => {
  const logoRef = useRef(null);

  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;

    const paths = logo.querySelectorAll('.letter-path');

    paths.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
    });

    anime({
      targets: '.letter-path',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 2000,
      delay: (el, i) => i * 100,
      direction: 'normal',
      loop: false,
    });
  }, []);

  return (
    <div className="flex items-center h-8 md:h-12">
      <svg
        ref={logoRef}
        viewBox="0 0 1200 100"
        className="h-full w-full max-w-[200px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        {/* G */}
        <path
          className="letter-path"
          d="M40,50 C40,35 30,35 30,50 C30,65 40,65 40,50 M40,50 L35,50"
        />
        {/* L */}
        <path className="letter-path" d="M80,30 L80,70 L95,70" />
        {/* O */}
        <path
          className="letter-path"
          d="M130,50 C130,35 115,35 115,50 C115,65 130,65 130,50"
        />
        {/* B */}
        <path
          className="letter-path"
          d="M160,30 L160,70 M160,30 C175,30 175,50 160,50 M160,50 C175,50 175,70 160,70"
        />
        {/* A */}
        <path
          className="letter-path"
          d="M200,70 L210,30 L220,70 M205,55 L215,55"
        />
        {/* L */}
        <path className="letter-path" d="M240,30 L240,70 L255,70" />

        {/* F */}
        <path
          className="letter-path"
          d="M300,30 L300,70 M300,30 L315,30 M300,50 L310,50"
        />
        {/* O */}
        <path
          className="letter-path"
          d="M350,50 C350,35 335,35 335,50 C335,65 350,65 350,50"
        />
        {/* O */}
        <path
          className="letter-path"
          d="M390,50 C390,35 375,35 375,50 C375,65 390,65 390,50"
        />
        {/* D */}
        <path
          className="letter-path"
          d="M420,30 L420,70 C435,70 435,30 420,30"
        />

        {/* C */}
        <path
          className="letter-path"
          d="M500,50 C500,35 485,35 485,50 C485,65 500,65 500,50"
        />
        {/* E */}
        <path
          className="letter-path"
          d="M540,30 L540,70 L555,70 M540,50 L550,50 M540,30 L555,30"
        />
        {/* N */}
        <path
          className="letter-path"
          d="M580,70 L580,30 L600,70 L600,30"
        />
        {/* T */}
        <path className="letter-path" d="M630,30 L650,30 M640,30 L640,70" />
        {/* E */}
        <path
          className="letter-path"
          d="M680,30 L680,70 L695,70 M680,50 L690,50 M680,30 L695,30"
        />
        {/* R */}
        <path
          className="letter-path"
          d="M720,30 L720,70 M720,30 C735,30 735,50 720,50 L735,70"
        />
      </svg>
    </div>
  );
};

export default AnimatedLogo;
