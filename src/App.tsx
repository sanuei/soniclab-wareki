import React, { useState, useEffect, useMemo } from 'react';
import { Language, Era } from './types';
import { I18N, ERAS, ERAS_UI, getErasByYear, getEraByYear, toWesternYear, toEraYear, ERA_NAMES, ExtendedI18n } from './constants';

const langCodeToLang: Record<string, Language> = { jp: 'ja', en: 'en', zh: 'zh' };
const langToLangCode: Record<Language, string> = { ja: 'jp', en: 'en', zh: 'zh' };

type Direction = 'western-to-era' | 'era-to-western';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ja');
  const [direction, setDirection] = useState<Direction>('western-to-era');
  const [westernInput, setWesternInput] = useState('');
  const [eraInput, setEraInput] = useState('')
  const [selectedEra, setSelectedEra] = useState<Era>('reiwa');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [todayResult, setTodayResult] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const i18n = useMemo(() => I18N[lang] as ExtendedI18n, [lang]);

  // Get today's date in all eras
  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const eraInfo = getEraByYear(year);
    if (eraInfo) {
      const eraYear = year - eraInfo.startYear + 1;
      const eraName = ERA_NAMES[lang][eraInfo.id];
      setTodayResult(`${lang === 'ja' ? `${eraName}${eraYear}年${month}月${day}日` : lang === 'zh' ? `${eraName}${eraYear}年${month}月${day}日` : `${eraName} ${eraYear}, ${month}/${day}`}`);
    }
  }, [lang]);

  // Western to Era conversion — shows all overlapping eras for a year
  const convertWesternToEra = (value: string): string => {
    const year = parseInt(value, 10);
    if (isNaN(year)) return '';
    const eras = getErasByYear(year);
    if (!eras.length) return '';
    const formatEra = (era: typeof eras[0], eraYear: number) => {
      const eraName = ERA_NAMES[lang][era.id];
      if (lang === 'en') return `${era.name} ${eraYear} (${year})`;
      return `${eraName}${eraYear}年`;
    };
    return eras.map(e => formatEra(e, year - e.startYear + 1)).join(' / ');
  };

  // Era to Western conversion
  const convertEraToWestern = (era: Era, eraYear: number): string => {
    const western = toWesternYear(era, eraYear);
    if (isNaN(western)) return '';
    return String(western);
  };

  // Handle western input change
  const handleWesternChange = (value: string) => {
    setWesternInput(value);
    setError('');
    if (!value.trim()) {
      setResult('');
      return;
    }
    const converted = convertWesternToEra(value.trim());
    if (!converted) {
      setError(i18n.errorOutOfRange);
      setResult('');
    } else {
      setResult(converted);
    }
  };

  // Handle era input change
  const handleEraInputChange = (value: string) => {
    setEraInput(value);
    setError('');
    if (!value.trim()) {
      setResult('');
      return;
    }
    const yearNum = parseInt(value, 10);
    if (isNaN(yearNum) || yearNum < 1) {
      setError(i18n.errorInvalidEraYear);
      setResult('');
      return;
    }
    const converted = convertEraToWestern(selectedEra, yearNum);
    if (isNaN(parseInt(converted))) {
      setResult('');
    } else {
      setResult(converted);
    }
  };

  // Swap direction
  const handleSwap = () => {
    setDirection(d => d === 'western-to-era' ? 'era-to-western' : 'western-to-era');
    setWesternInput('');
    setEraInput('');
    setResult('');
    setError('');
  };

  // Copy result
  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  // Toggle dark mode
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const handleLangChange = (newLang: Language) => {
    setLang(newLang);
  };

  const inputValue = direction === 'western-to-era' ? westernInput : eraInput;
  const handleInputChange = direction === 'western-to-era' ? handleWesternChange : handleEraInputChange;
  const placeholder = direction === 'western-to-era' ? i18n.placeholderYear : i18n.placeholderEraYear;

  return (
    <div className="min-h-screen selection:bg-primary/20 flex flex-col font-sans bg-[#f8fafc] dark:bg-[#020617]">
      {/* Navbar */}
      <nav className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 h-16 flex items-center shrink-0 sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-900/80">
        <div className="max-w-[1200px] mx-auto w-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center flex-shrink-0 shadow-sm transition-transform duration-300 hover:scale-105">
              <span className="text-2xl">📅</span>
            </div>
            <div className="hidden sm:flex flex-col justify-center">
              <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-none mb-1">
                Wareki
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-none">
                {i18n.toolWarekiSub}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
              {(['jp', 'en', 'zh'] as const).map(code => (
                <button
                  key={code}
                  onClick={() => handleLangChange(langCodeToLang[code])}
                  className={`px-2 sm:px-3 py-1.5 rounded-md text-xs font-bold transition-all ${lang === langCodeToLang[code] ? 'bg-primary text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'}`}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>
            <button onClick={toggleDarkMode} className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-700">
              {isDarkMode ? '🌞' : '🌙'}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-[1200px] mx-auto py-8 lg:py-10 px-6 w-full flex-grow flex flex-col gap-8">

        {/* Hero */}
        <header className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-[900] text-slate-900 dark:text-white tracking-tight leading-tight">
            {i18n.title}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium max-w-lg mx-auto text-sm sm:text-base">
            {i18n.subtitle}
          </p>
          {/* Today's date */}
          {todayResult && (
            <div className="inline-flex items-center gap-2 mt-2 px-4 py-2 bg-white dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{i18n.todayLabel}</span>
              <span className="text-sm font-bold text-primary">{todayResult}</span>
            </div>
          )}
        </header>

        {/* Era Quick Reference */}
        <div className="flex flex-wrap justify-center gap-2">
          {ERAS_UI.map(era => (
            <div key={era.id} className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <span className="text-sm font-black text-slate-700 dark:text-slate-300">{ERA_NAMES[lang][era.id]}</span>
              <span className="text-[10px] font-medium text-slate-400">{era.startYear}–{era.endYear}</span>
            </div>
          ))}
        </div>

        {/* Main Converter Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

          {/* Input Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-premium flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 h-full">
            <div className="h-14 px-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/20 rounded-t-3xl">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <span className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  {direction === 'western-to-era' ? i18n.westernLabel : i18n.eraYearLabel}
                </span>
              </div>
              <button
                onClick={handleSwap}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-500 hover:text-primary hover:border-primary transition-all"
              >
                ⇄ {i18n.btnSwap}
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Era selector (for era-to-western mode) */}
              {direction === 'era-to-western' && (
                <div className="flex flex-wrap gap-2">
                  {ERAS.map(era => (
                    <button
                      key={era.id}
                      onClick={() => { setSelectedEra(era.id); setResult(''); }}
                      className={`px-3 py-2 rounded-xl text-xs font-black transition-all border ${
                        selectedEra === era.id
                          ? 'bg-primary text-white border-primary shadow-sm'
                          : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-primary'
                      }`}
                    >
                      {ERA_NAMES[lang][era.id]}
                    </button>
                  ))}
                </div>
              )}

              {/* Input field */}
              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  className="w-full p-4 text-2xl font-bold bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl focus:border-primary focus:ring-0 outline-none transition-all text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600"
                  placeholder={placeholder}
                  value={inputValue}
                  onChange={e => handleInputChange(e.target.value)}
                  spellCheck={false}
                />
              </div>

              {error && (
                <p className="text-xs font-bold text-red-500">{error}</p>
              )}

              {/* Direction label */}
              <div className="flex items-center justify-center">
                <div className="flex items-center gap-3 text-slate-400">
                  <div className="h-px w-8 bg-slate-200 dark:bg-slate-700"></div>
                  <span className="text-xs font-bold uppercase tracking-widest">
                    {direction === 'western-to-era' ? i18n.westernLabel + ' → ' + i18n.eraYearLabel : i18n.eraYearLabel + ' → ' + i18n.westernLabel}
                  </span>
                  <div className="h-px w-8 bg-slate-200 dark:bg-slate-700"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Output Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-premium flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 h-full">
            <div className="h-14 px-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/20 rounded-t-3xl">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  {i18n.resultLabel}
                </span>
              </div>
            </div>

            <div className="flex-grow p-6 flex flex-col items-center justify-center min-h-[160px]">
              {result ? (
                <div className="text-center space-y-2">
                  <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                    {result}
                  </div>
                  {direction === 'western-to-era' && westernInput && result && (
                    <div className="text-sm font-bold text-slate-400">
                      {i18n.westernLabel}: {westernInput}
                    </div>
                  )}
                  {direction === 'era-to-western' && eraInput && result && (
                    <div className="text-sm font-bold text-slate-400">
                      {i18n.eraYearLabel}: {ERA_NAMES[lang][selectedEra]}{eraInput}年
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-slate-300 dark:text-slate-600 text-sm font-bold">
                  {i18n.placeholderYear}
                </div>
              )}
            </div>

            <div className="px-4 py-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 rounded-b-3xl flex justify-end">
              <button
                onClick={handleCopy}
                disabled={!result}
                className={`px-6 py-2.5 rounded-xl font-black text-xs transition-all flex items-center gap-2 transform active:scale-95 ${
                  copyFeedback
                    ? 'bg-green-500 text-white shadow-green-500/20 shadow-lg scale-105'
                    : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 shadow-md'
                } disabled:opacity-20 disabled:shadow-none disabled:transform-none`}
              >
                {copyFeedback ? (
                  <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>{i18n.btnCopied}</>
                ) : (
                  <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>{i18n.btnCopy}</>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* How to use */}
        <section className="pt-8 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 mb-8 text-center">{i18n.guideTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '01', text: i18n.guideStep1 },
              { step: '02', text: i18n.guideStep2 },
              { step: '03', text: i18n.guideStep3 },
            ].map((item, idx) => (
              <div key={idx} className="bg-white/50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 transition-colors">
                <div className="text-slate-300 dark:text-slate-600 font-black text-3xl mb-4 italic tracking-tighter">{item.step}</div>
                <p className="text-sm text-slate-700 dark:text-slate-300 font-bold leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 shrink-0">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
            <div className="text-center md:text-left space-y-3">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center shadow-sm">
                  <span className="text-lg">📅</span>
                </div>
                <span className="text-sm font-bold text-slate-900 dark:text-white">Wareki</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium max-w-xs leading-relaxed uppercase tracking-wider">
                {i18n.subtitle}
              </p>
            </div>
            <div className="flex gap-4">
              <a href="https://www.youtube.com/@sonicyann" target="_blank" className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:text-[#FF0000] transition-all text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="https://x.com/sonic_yann" target="_blank" className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:text-primary transition-all text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-50 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
              <span>&copy; 2026 wareki</span>
              <span className="w-1 h-1 rounded-full bg-slate-200"></span>
              <span>{i18n.footerCredit}</span>
            </div>
            <span className="text-[9px] font-bold text-slate-300 dark:text-slate-700 uppercase tracking-[0.5em]">Privacy-First Local Processing</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
