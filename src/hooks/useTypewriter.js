import { useEffect, useRef, useState } from 'react';

export function useTypewriter(text, speed = 24) {
  const targetRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    const target = targetRef.current;

    if (!target) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.45 },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setDisplayedText('');

    if (!isVisible || !text) {
      return undefined;
    }

    let currentIndex = 0;
    const timer = window.setInterval(() => {
      currentIndex += 1;
      setDisplayedText(text.slice(0, currentIndex));

      if (currentIndex >= text.length) {
        window.clearInterval(timer);
      }
    }, speed);

    return () => window.clearInterval(timer);
  }, [isVisible, speed, text]);

  return { targetRef, displayedText: displayedText || (isVisible ? '' : text) };
}
