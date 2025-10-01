<script lang="ts">
import { LANG_CS, LANG_DEFAULT, LANG_EN} from "@constants/constants.ts";
import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import Icon from "@iconify/svelte";
import {
	getStoredTheme,
	setTheme,
} from "@utils/setting-utils.ts";
import { onMount } from "svelte";
import type { LANG } from "@/types/config.ts";
    import { getLangFromUrl, LANG_SEQ } from "@utils/lang-utils";

const lang = getLangFromUrl(new URL(window.location.href));

onMount(() => {
    // applyLangToDocument(mode);
});


function switchLang(newLang: LANG) {
    const url = new URL(window.location.href);
    const segments = url.pathname.split('/').filter(Boolean);
    const hasPrefix = lang !== LANG_DEFAULT;
    const newHasPrefix = newLang !== LANG_DEFAULT;

    const path = segments.slice(hasPrefix ? 2 : 1);

    const newSegments = [];
    if (newHasPrefix) newSegments.push(newLang);
    newSegments.push(...path);

    url.pathname = '/' + newSegments.join('/');
    window.location.href = url.toString();
}

function toggleLang() {
	let i = 0;
	for (; i < LANG_SEQ.length; i++) {
		if (LANG_SEQ[i] === lang) {
			break;
		}
	}
	switchLang(LANG_SEQ[(i + 1) % LANG_SEQ.length]);
}

function showPanel() {
	const panel = document.querySelector("#lang-switch-panel");
	panel.classList.remove("float-panel-closed");
}

function hidePanel() {
	const panel = document.querySelector("#lang-switch-panel");
	panel.classList.add("float-panel-closed");
}
</script>

<!-- z-50 make the panel higher than other float panels -->
<div class="relative z-50" role="menu" tabindex="-1" onmouseleave={hidePanel}>
    <button aria-label="Lang mode" role="menuitem" class="relative btn-plain scale-animation rounded-lg h-11 w-11 active:scale-90" id="lang-switch" onclick={toggleLang} onmouseenter={showPanel}>
        <!-- <div class="absolute" class:opacity-0={mode !== LANG_CS}>
            <Icon icon="material-symbols:language" class="text-[1.25rem]"></Icon>
        </div>
        <div class="absolute" class:opacity-0={mode !== LANG_EN}>
            <Icon icon="material-symbols:language" class="text-[1.25rem]"></Icon>
        </div> -->

        <div class="absolute" class:opacity-0={lang !== LANG_CS}>
            CS
        </div>
        <div class="absolute" class:opacity-0={lang !== LANG_EN}>
            EN
        </div>
    </button>

    <div id="lang-switch-panel" class="hidden lg:block absolute transition float-panel-closed top-11 -right-2 pt-5" >
        <div class="card-base float-panel p-2">
            <button class="flex transition whitespace-nowrap items-center !justify-start w-full btn-plain scale-animation rounded-lg h-9 px-3 font-medium active:scale-95 mb-0.5"
                    class:current-theme-btn={lang === LANG_CS}
                    onclick={() => switchLang(LANG_CS)}
            >
                <!-- <Icon icon="material-symbols:language" class="text-[1.25rem] mr-3"></Icon> -->
                {i18n(I18nKey.langTitleCs, lang)}
            </button>
            <button class="flex transition whitespace-nowrap items-center !justify-start w-full btn-plain scale-animation rounded-lg h-9 px-3 font-medium active:scale-95 mb-0.5"
                    class:current-theme-btn={lang === LANG_EN}
                    onclick={() => switchLang(LANG_EN)}
            >
                <!-- <Icon icon="material-symbols:language" class="text-[1.25rem] mr-3"></Icon> -->
                {i18n(I18nKey.langTitleEn, lang)}
            </button>

        </div>
    </div>
</div>
