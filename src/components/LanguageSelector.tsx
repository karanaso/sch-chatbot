import flagGreek from "@/assets/svg/flag_Greek.svg"
import flagEn from '@/assets/svg/flag_US_EN.svg'
import { useEffect } from "react";


export const LanguageSelector = () => {
  const getLangId = () => sessionStorage.getItem('langId') || 'en';

  const setLangId = (langId: string) => sessionStorage.setItem('langId', langId);

  useEffect(() => {
    const langId = sessionStorage.getItem('langId');
    if (!langId) {
      sessionStorage.setItem('langId', 'en');
    }
  }, []);

  return (
    getLangId() === 'en'
      ? <img src={flagGreek} onClick={() => setLangId('el')} />
      : <img src={flagEn} onClick={() => setLangId('en')} />
  )
}