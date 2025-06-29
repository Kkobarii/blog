import type { LANG } from "@/types/config";
import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import { translatePath } from "./lang-utils";
import { LANG_DEFAULT } from "@constants/constants";


export function pathsEqual(path1: string, path2: string) {
	const normalizedPath1 = path1.replace(/^\/|\/$/g, "").toLowerCase();
	const normalizedPath2 = path2.replace(/^\/|\/$/g, "").toLowerCase();
	return normalizedPath1 === normalizedPath2;
}

function joinUrl(...parts: string[]): string {
	const joined = parts.join("/");
	return joined.replace(/\/+/g, "/");
}

export function getPostUrlBySlug(slug: string, lang: LANG): string {
	const prefix = lang == LANG_DEFAULT ? "" : lang;
	return url(`${prefix}/posts/${slug}/`);
}

export function getTagUrl(tag: string, lang: LANG): string {
	if (!tag) return url(translatePath("/archive/", lang));
	return url(translatePath(`/archive/?tag=${encodeURIComponent(tag.trim())}`, lang));
}

export function getCategoryUrl(category: string | null, lang: LANG): string {
	if (
		!category ||
		category.trim() === "" ||
		category.trim().toLowerCase() === i18n(I18nKey.uncategorized, lang).toLowerCase()
	)
		return url(translatePath("/archive/?uncategorized=true", lang));
	return url(translatePath(`/archive/?category=${encodeURIComponent(category.trim())}`, lang));
}

export function getDir(path: string): string {
	const lastSlashIndex = path.lastIndexOf("/");
	if (lastSlashIndex < 0) {
		return "/";
	}
	return path.substring(0, lastSlashIndex + 1);
}

export function url(path: string) {
	return joinUrl("", import.meta.env.BASE_URL, path);
}
