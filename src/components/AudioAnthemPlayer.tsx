import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, Volume2, VolumeX, Music, BookOpen, Sparkles } from 'lucide-react';
import { SENA_ANTHEM } from '../data/senaData';
import { SenaLogo } from './common/SenaLogo';

// Frequencies for the opening triumphal fanfare of the SENA Anthem
// "Estudiantes del SENA adelante... Por Colombia luchad con amor"
const ANTHEM_NOTES: { note: number; dur: number; lyric: string }[] = [
  { note: 392.00, dur: 0.35, lyric: "Es-tu-" }, // G4
  { note: 440.00, dur: 0.35, lyric: "dian-tes" }, // A4
  { note: 523.25, dur: 0.5, lyric: "del" }, // C5
  { note: 659.25, dur: 0.8, lyric: "SE-NA," }, // E5
  { note: 587.33, dur: 0.7, lyric: "¡a-de-lan-te!" }, // D5
  { note: 392.00, dur: 0.35, lyric: "Por" }, // G4
  { note: 523.25, dur: 0.35, lyric: "Co-lom-" }, // C5
  { note: 587.33, dur: 0.4, lyric: "bia" }, // D5
  { note: 659.25, dur: 0.8, lyric: "lu-chad" }, // E5
  { note: 523.25, dur: 0.9, lyric: "con a-mor," }, // C5
  { note: 440.00, dur: 0.35, lyric: "con el" }, // A4
  { note: 523.25, dur: 0.35, lyric: "á-ni-mo" }, // C5
  { note: 587.33, dur: 0.4, lyric: "no-ble y" }, // D5
  { note: 659.25, dur: 0.7, lyric: "cons-tan-te," }, // E5
  { note: 587.33, dur: 0.4, lyric: "que la" }, // D5
  { note: 523.25, dur: 0.4, lyric: "pa-tria en" }, // C5
  { note: 493.88, dur: 0.4, lyric: "vo-so-tros" }, // B4
  { note: 523.25, dur: 1.1, lyric: "con-fió." } // C5
];

export const AudioAnthemPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentNoteIndex, setCurrentNoteIndex] = useState<number>(-1);
  const [activeStanza, setActiveStanza] = useState<number>(0);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isPlayingRef = useRef(false);
  const timeoutIdRef = useRef<number | null>(null);

  const stopAudio = () => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    setCurrentNoteIndex(-1);
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
  };

  const playFanfare = () => {
    if (isPlaying) {
      stopAudio();
      return;
    }

    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtxClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      isPlayingRef.current = true;
      setIsPlaying(true);

      const playStep = (index: number) => {
        if (!isPlayingRef.current || index >= ANTHEM_NOTES.length) {
          stopAudio();
          return;
        }

        setCurrentNoteIndex(index);
        const item = ANTHEM_NOTES[index];

        if (!isMuted) {
          // Create brass/bell tone synth
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(item.note, ctx.currentTime);

          // Second harmonic for brass warmth
          const osc2 = ctx.createOscillator();
          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(item.note * 2, ctx.currentTime);
          const gain2 = ctx.createGain();

          gain.gain.setValueAtTime(0.001, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.22, ctx.currentTime + 0.04);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + item.dur);

          gain2.gain.setValueAtTime(0.001, ctx.currentTime);
          gain2.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.04);
          gain2.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + item.dur);

          osc.connect(gain);
          osc2.connect(gain2);
          gain.connect(ctx.destination);
          gain2.connect(ctx.destination);

          osc.start();
          osc2.start();
          osc.stop(ctx.currentTime + item.dur);
          osc2.stop(ctx.currentTime + item.dur);
        }

        timeoutIdRef.current = window.setTimeout(() => {
          playStep(index + 1);
        }, item.dur * 1000 + 40);
      };

      playStep(0);
    } catch {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      stopAudio();
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-colors duration-300">
      {/* Header bar */}
      <div className="bg-gradient-to-r from-[#005e26] via-[#39A900] to-[#007832] dark:from-[#003816] dark:via-[#005e26] dark:to-[#00471c] p-5 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-sm p-1.5">
              <SenaLogo variant="white" className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg leading-tight">Himno Oficial del SENA</h3>
              <p className="text-xs text-emerald-100">
                Letra: {SENA_ANTHEM.lyricsAuthor} · Música: {SENA_ANTHEM.musicAuthor}
              </p>
            </div>
          </div>

          {/* Synth Fanfare Playback Controls */}
          <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-lg backdrop-blur-sm">
            <button
              onClick={playFanfare}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                isPlaying 
                  ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-sm' 
                  : 'bg-white text-[#005e26] hover:bg-emerald-50 shadow-sm'
              }`}
              title={isPlaying ? "Detener melodía" : "Escuchar fanfarria institucional"}
            >
              {isPlaying ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>Detener</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Escuchar Melodía</span>
                </>
              )}
            </button>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 rounded-md hover:bg-white/20 text-white transition-colors"
              title={isMuted ? "Activar sonido" : "Silenciar"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Live Karaokee / Synchronized Notes Bar */}
        {isPlaying && (
          <div className="mt-4 pt-3 border-t border-white/15 flex items-center gap-2 overflow-x-auto py-1">
            <span className="text-[11px] font-medium text-emerald-200 whitespace-nowrap">
              Melodía:
            </span>
            <div className="flex gap-1.5">
              {ANTHEM_NOTES.map((n, idx) => (
                <span
                  key={idx}
                  className={`text-xs px-2 py-0.5 rounded transition-all ${
                    currentNoteIndex === idx
                      ? 'bg-amber-300 text-slate-900 font-bold scale-110 shadow'
                      : idx < currentNoteIndex
                      ? 'text-white/80 font-normal'
                      : 'text-white/40'
                  }`}
                >
                  {n.lyric}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Content: Chorus & Stanzas */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chorus section */}
        <div className="lg:col-span-5 bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/60 rounded-xl p-5 flex flex-col justify-between transition-colors">
          <div>
            <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-300 font-heading font-bold text-sm mb-3">
              <Sparkles className="w-4 h-4 text-[#39A900]" />
              <span>EL CORO INSTITUCIONAL</span>
            </div>
            <p className="font-heading italic text-slate-800 dark:text-slate-100 text-base leading-relaxed whitespace-pre-line font-medium pl-3 border-l-3 border-[#39A900]">
              {SENA_ANTHEM.chorus}
            </p>
          </div>
          <div className="mt-5 pt-4 border-t border-emerald-200/60 dark:border-emerald-900/60 text-xs text-slate-600 dark:text-slate-300">
            <strong className="text-slate-800 dark:text-slate-200">Protocolo SENA:</strong> El himno se entona con orgullo y respeto de pie al inicio de actos solemnes, ceremonias de inducción y graduaciones en todos los centros de formación de Colombia.
          </div>
        </div>

        {/* Stanzas analysis with selector */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#39A900]" />
                Estrofas y Significado Pedagógico
              </span>
              <div className="flex items-center gap-1 p-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
                {SENA_ANTHEM.stanzas.map((st, idx) => (
                  <button
                    key={st.number}
                    onClick={() => setActiveStanza(idx)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                      activeStanza === idx
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-semibold'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Estrofa {st.number}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-200 dark:border-slate-700 transition-colors">
              <span className="text-xs font-bold text-[#007832] dark:text-emerald-400 uppercase mb-1 block">
                Estrofa {SENA_ANTHEM.stanzas[activeStanza].number}
              </span>
              <p className="text-sm font-serif italic text-slate-700 dark:text-slate-200 whitespace-pre-line mb-3 pl-3 border-l-2 border-slate-300 dark:border-slate-600">
                {SENA_ANTHEM.stanzas[activeStanza].text}
              </p>
              <div className="bg-white dark:bg-slate-900 rounded-lg p-3 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
                <strong className="text-slate-900 dark:text-white">Apropiación del mensaje: </strong>
                {SENA_ANTHEM.stanzas[activeStanza].explanation}
              </div>
            </div>
          </div>

          <div className="mt-4 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Servicio Nacional de Aprendizaje SENA · Identidad y Pertenencia</span>
            <span>Himno adoptado en 1960</span>
          </div>
        </div>
      </div>
    </div>
  );
};
