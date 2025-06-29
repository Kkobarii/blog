import type { LANG } from "@/types/config";
import { LANG_CS, LANG_DEFAULT, LANG_EN } from "@constants/constants";

export const LANG_SEQ: LANG[] = [LANG_CS, LANG_EN];


export function getLangFromUrl(url: URL): LANG {
  const [,, lang] = url.pathname.split('/');
  const l = LANG_SEQ.includes(lang as LANG) ? lang as LANG : LANG_DEFAULT;


  return l;
}

// export function useTranslatedPath(lang: LANG) {
//     return function translatePath(path: string, l: LANG = lang) {
//       return  l === LANG_DEFAULT ? path : `/${l}${path}`
//     }
// }

export function translatePath(path: string, lang: LANG): string {
  return lang === LANG_DEFAULT ? path : `/${lang}${path}`
}

export function applyLangToDocument(lang: LANG) {
	document.querySelectorAll('[post-lang]').forEach(el => {
		if (el instanceof HTMLElement) {
		  el.hidden = el.getAttribute('post-lang') !== lang;
		}
	});
}

// export function saveDynamicLang(lang: LANG): void {
// 	localStorage.setItem("lang", lang);
// 	applyLangToDocument(lang);
// }

// export function getStoredLang(): LANG {
// 	return (localStorage.getItem("lang") as LANG) || LANG_EN;
// }
