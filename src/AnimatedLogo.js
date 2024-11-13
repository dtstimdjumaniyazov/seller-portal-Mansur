import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const AnimatedLogo = () => {
  const logoRef = useRef(null);

  useEffect(() => {
    const textElements = logoRef.current.querySelectorAll('text tspan');
    const paths = logoRef.current.querySelectorAll('path');
    
    const initialAnimation = anime.timeline({
      easing: 'cubicBezier(0.645, 0.045, 0.355, 1.000)'
    })
    .add({
      targets: '.logo-line',
      strokeDashoffset: [anime.setDashoffset, 0],
      opacity: [0, 1],
      duration: 1500,
      delay: anime.stagger(100),
      easing: 'easeOutQuart'
    })
    .add({
      targets: '.LogoGlobalFoodsCenter_svg__cls-6',
      opacity: [0, 1],
      translateY: [-30, 0],
      rotateX: [-40, 0],
      scale: [0.8, 1],
      duration: 1200,
      delay: anime.stagger(150),
      easing: 'easeOutExpo'
    }, '-=800')
    .add({
      targets: '.LogoGlobalFoodsCenter_svg__cls-4',
      opacity: [0, 1],
      translateY: [-20, 0],
      scale: [0.95, 1],
      duration: 1000,
      delay: anime.stagger(30),
      easing: 'easeOutQuint'
    }, '-=1000');

    // Добавляем новую анимацию мерцания букв
    const letterFlashAnimation = () => {
      const letters = Array.from(textElements);
      // Выбираем случайное количество букв для анимации (от 1 до 3)
      const numberOfLetters = Math.floor(Math.random() * 3) + 1;
      
      // Выбираем случайные буквы
      const randomLetters = letters
        .sort(() => Math.random() - 0.5)
        .slice(0, numberOfLetters);
      
      anime.timeline({
        easing: 'easeInOutQuad'
      })
      .add({
        targets: randomLetters,
        opacity: [1, 0.2, 1],
        scale: [1, 0.95, 1],
        duration: 800,
        endDelay: 200,
        complete: () => {
          // Запускаем следующую анимацию через случайный интервал (3-8 секунд)
          setTimeout(letterFlashAnimation, Math.random() * 5000 + 3000);
        }
      });
    };

    // Запускаем первую анимацию мерцания через 2 секунды после начальной анимации
    setTimeout(letterFlashAnimation, 2000);

    const floatingAnimation = anime({
      targets: '.logo-text',
      translateY: [-2, 2],
      duration: 2000,
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutQuad'
    });

    const glowAnimation = anime({
      targets: '.accent-element',
      filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1)'],
      duration: 3000,
      loop: true,
      easing: 'easeInOutSine'
    });

    const lineAnimation = anime({
      targets: '.logo-line',
      strokeDashoffset: [0, anime.setDashoffset],
      duration: 8000,
      loop: true,
      direction: 'alternate',
      easing: 'linear'
    });

    const container = logoRef.current;
    let hoverTimeline = anime.timeline({
      autoplay: false,
      direction: 'alternate',
    });

    hoverTimeline
      .add({
        targets: '.accent-element',
        scale: 1.1,
        duration: 400,
        easing: 'easeOutQuart'
      })
      .add({
        targets: '.logo-text',
        scale: 1.02,
        duration: 400,
        easing: 'easeOutQuart'
      }, '-=400');

    container.addEventListener('mouseenter', () => hoverTimeline.play());
    container.addEventListener('mouseleave', () => hoverTimeline.reverse());

    return () => {
      floatingAnimation.pause();
      glowAnimation.pause();
      lineAnimation.pause();
      container.removeEventListener('mouseenter', () => hoverTimeline.play());
      container.removeEventListener('mouseleave', () => hoverTimeline.reverse());
    };
  }, []);

  return (
    <div className="relative w-full h-24">
      <svg
        ref={logoRef}
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 1000 120"
        className="transform-gpu w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="accent-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#2193b0' }} />
            <stop offset="100%" style={{ stopColor: '#6dd5ed' }} />
          </linearGradient>
          <linearGradient id="text-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#2c3e50' }} />
            <stop offset="100%" style={{ stopColor: '#3f4f5f' }} />
          </linearGradient>
          <filter id="premium-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="glow"/>
            <feColorMatrix
              in="glow"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 15 -7"
              result="brightGlow"
            />
            <feMerge>
              <feMergeNode in="brightGlow"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <style>
            {`
              .LogoGlobalFoodsCenter_svg__cls-4 {
                fill: url(#text-gradient);
                font-family: 'Montserrat', sans-serif;
                font-weight: 600;
              }
              .LogoGlobalFoodsCenter_svg__cls-6 {
                fill: url(#accent-gradient);
                filter: url(#premium-glow);
                font-family: 'Montserrat', sans-serif;
                font-weight: 700;
              }
              .logo-line {
                stroke: url(#accent-gradient);
                stroke-width: 2;
                fill: none;
              }
              .accent-element {
                filter: url(#premium-glow);
              }
              .logo-text {
                transform-origin: center;
              }
            `}
          </style>
        </defs>

        <path className="logo-line" d="M100,100 L900,100" strokeDasharray="5,5"/>
        <path className="logo-line accent-element" d="M50,20 L900,20"/>
        
        <g className="logo-text">
          <text
            style={{
              fontSize: "72px",
              letterSpacing: "0px"
            }}
            x="0"
            y="65"
            textAnchor="start"
            dominantBaseline="middle"
          >
            <tspan 
              className="LogoGlobalFoodsCenter_svg__cls-6 accent-element"
            >
              {"G"}
            </tspan>
            <tspan
              className="LogoGlobalFoodsCenter_svg__cls-4"
              dx="5"
            >
              {"lobal"}
            </tspan>
            <tspan
              className="LogoGlobalFoodsCenter_svg__cls-6 accent-element"
              dx="40"
            >
              {"F"}
            </tspan>
            <tspan
              className="LogoGlobalFoodsCenter_svg__cls-4"
              dx="5"
            >
              {"oods"}
            </tspan>
            <tspan
              className="LogoGlobalFoodsCenter_svg__cls-6 accent-element"
              dx="40"
            >
              {"C"}
            </tspan>
            <tspan
              className="LogoGlobalFoodsCenter_svg__cls-4"
              dx="5"
            >
              {"enter"}
            </tspan>
          </text>
        </g>
      </svg>
    </div>
  );
};

export default AnimatedLogo;