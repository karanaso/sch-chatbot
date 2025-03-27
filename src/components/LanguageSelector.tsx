import flagGreek from "@/assets/svg/flag_Greek.svg"
import flagEn from '@/assets/svg/flag_US_EN.svg'
import { useEffect } from "react";


export const LanguageSelector = () => {
  const getLangId = () => localStorage.getItem('langId') || 'en';

  const setLangId = (langId: string) => localStorage.setItem('langId', langId);

  useEffect(() => {
    const langId = localStorage.getItem('langId');
    if (!langId) {
      localStorage.setItem('langId', 'en');
    }
  }, []);

  return (
    getLangId() === 'en'
      ? <img src={flagGreek} onClick={() => setLangId('el')} />
      : <img src={flagEn} onClick={() => setLangId('en')} />
  )
}