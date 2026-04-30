import { Play, Pause, SkipForward, SkipBack, Music } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const TRACKS = [
  { id: 1, title: 'Neon Overdrive (AI Core)', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 2, title: 'Cyber Drone (Synth AI)', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: 3, title: 'Grid Runner (Procedural)', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' }
];

export default function MusicPlayer() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(e => {
            console.log('Autoplay prevented', e);
            setIsPlaying(false);
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  const onEnded = () => {
    nextTrack();
  };

  return (
    <footer className="h-24 bg-[#08080a] border-t-2 border-fuchsia-500 px-8 flex items-center justify-between w-full shadow-[0_0_20px_rgba(255,0,255,0.3)] z-40 relative">
      <audio 
        ref={audioRef} 
        src={TRACKS[currentTrack].url} 
        onEnded={onEnded}
      />

      <div className="flex items-center gap-4 w-72">
        <div className="w-14 h-14 bg-fuchsia-900 border-2 border-cyan-400 flex items-center justify-center shadow-[4px_4px_0_rgba(255,0,255,1)]">
           <svg className="w-8 h-8 text-white drop-shadow-[1px_1px_0_rgba(0,255,255,0.8)]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold truncate text-white glitch-text" data-text={TRACKS[currentTrack].title}>{TRACKS[currentTrack].title}</span>
          <span className="text-sm font-bold text-fuchsia-400 uppercase tracking-widest drop-shadow-[1px_1px_0_rgba(0,255,255,0.8)]">AI Generated Audio</span>
        </div>
      </div>

      <div className="flex flex-col items-center flex-1 max-w-lg mx-12">
        <div className="flex items-center gap-8 mb-3">
          <button onClick={prevTrack} className="text-fuchsia-500 hover:text-cyan-400 transition-colors focus:outline-none drop-shadow-[2px_2px_0_rgba(0,255,255,0.5)]">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z"/></svg>
          </button>
          <button onClick={handlePlayPause} className="w-14 h-14 bg-cyan-500 border-2 border-white flex items-center justify-center hover:bg-fuchsia-500 transition-colors focus:outline-none shadow-[4px_4px_0_rgba(255,0,255,1)] hover:shadow-[4px_4px_0_rgba(0,255,255,1)]">
            {isPlaying ? (
              <Pause className="w-6 h-6 text-black" fill="currentColor" />
            ) : (
              <svg className="w-8 h-8 ml-1 text-black" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.333-5.89a1.5 1.5 0 000-2.538L6.3 2.841z"/></svg>
            )}
          </button>
          <button onClick={nextTrack} className="text-cyan-500 hover:text-fuchsia-400 transition-colors focus:outline-none drop-shadow-[2px_2px_0_rgba(255,0,255,0.5)]">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z"/></svg>
          </button>
        </div>
        <div className="w-full flex items-center gap-3">
          <span className="text-sm font-bold text-cyan-400 drop-shadow-[1px_1px_0_rgba(255,0,255,0.8)]">00:00</span>
          <div className="flex-1 h-3 bg-[#050505] border-2 border-gray-800 relative overflow-hidden">
            <div className={`absolute left-0 top-0 h-full bg-fuchsia-500 border-r-2 border-white ${isPlaying ? 'animate-[pulse_1.5s_ease-in-out_infinite] w-full' : 'w-2/3'}`}></div>
          </div>
          <span className="text-sm font-bold text-fuchsia-400 drop-shadow-[1px_1px_0_rgba(0,255,255,0.8)]">Live</span>
        </div>
      </div>

      <div className="flex items-center gap-3 w-72 justify-end text-cyan-500 hidden md:flex">
        <svg className="w-6 h-6 drop-shadow-[2px_2px_0_rgba(255,0,255,0.8)]" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/></svg>
        <div className="w-24 h-3 bg-[#050505] border-2 border-gray-800">
          <div className="w-3/4 h-full bg-cyan-500 border-r-2 border-white shadow-[0_0_10px_rgba(0,255,255,0.8)]"></div>
        </div>
        <svg className="w-6 h-6 drop-shadow-[2px_2px_0_rgba(255,0,255,0.8)]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.983 5.983 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.984 3.984 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd"/></svg>
      </div>
    </footer>
  );
}
