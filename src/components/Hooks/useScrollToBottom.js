import { useState, useEffect } from 'react';

const useScrollToBottom = (el, onScrollToBottom) => {
  const element = el || document.body;
  const [bottom, setBottom] = useState(false);

  const listener = () => {
    if (element.scrollTop + element.offsetHeight >= element.scrollHeight - 1) {
      console.log('hit bottom.');
      setBottom(true);
      onScrollToBottom();
    } else {
      setBottom(false);
    }
  };

  useEffect(() => {
    element.addEventListener('scroll', listener);
    return () => element.removeEventListener('scroll', listener);
  }, [element]);

  return bottom;
};

export default useScrollToBottom;
