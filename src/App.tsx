import { useState } from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { Terminal } from 'lucide-react';

export default function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#08080a] text-white overflow-hidden font-pixel">
      <div className="absolute inset-0 pointer-events-none scanlines z-50"></div>
      <header className="flex items-center justify-between px-8 py-4 border-b-2 border-cyan-500 bg-[#0c0c10] crt-flicker relative shadow-[0_0_20px_rgba(34,211,238,0.5)] z-40">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-fuchsia-600 rounded-sm shadow-[4px_4px_0_rgba(6,182,212,1)] flex items-center justify-center border-2 border-white">
            <Terminal className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white glitch-text" data-text="CYBERSNAKE v2.0">
              CYBERSNAKE v2.0
            </h1>
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-400 font-semibold drop-shadow-[2px_2px_0_rgba(255,0,255,0.8)]">Rhythm & Reflex Interface</p>
          </div>
        </div>
        <div className="flex items-center gap-12">
          <div className="text-right">
            <span className="text-sm text-fuchsia-500 uppercase tracking-widest block font-bold">Current Score</span>
            <span className="text-4xl font-bold text-cyan-400 drop-shadow-[2px_2px_0_rgba(255,0,255,0.8)] glitch-text" data-text={score.toString().padStart(5, '0')}>
              {score.toString().padStart(5, '0')}
            </span>
          </div>
          <div className="text-right">
            <span className="text-sm text-cyan-500 uppercase tracking-widest block font-bold">High Score</span>
            <span className="text-2xl font-bold text-fuchsia-500 opacity-80 drop-shadow-[2px_2px_0_rgba(0,255,255,0.8)]">
              01,240
            </span>
          </div>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden relative z-30 crt-flicker">
        <aside className="w-72 bg-[#0c0c10] border-r-2 border-fuchsia-500 flex flex-col hidden md:flex shadow-[0_0_30px_rgba(255,0,255,0.2)]">
          <div className="p-6">
            <h2 className="text-lg font-bold text-cyan-400 uppercase tracking-[0.15em] mb-6 drop-shadow-[2px_2px_0_rgba(255,0,255,0.8)]">Playlist: AI Core</h2>
            <div className="space-y-4 relative">
              {/* Add background glow to the playlist section */}
              <div className="absolute top-10 left-10 w-32 h-32 bg-cyan-500/30 blur-[60px] pointer-events-none w-full h-full"></div>
              <div className="absolute bottom-10 left-10 w-48 h-48 bg-fuchsia-500/20 blur-[60px] pointer-events-none rounded-full"></div>
              
              <div className="flex items-center gap-3 p-3 bg-[#14141d] border-2 border-cyan-500 shadow-[4px_4px_0_rgba(255,0,255,0.8)] relative z-10">
                <div className="w-12 h-12 bg-fuchsia-900 border-2 border-cyan-400 flex items-center justify-center">
                  <div className="w-1 h-4 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-[pulse_0.1s_infinite]"></div>
                  <div className="w-1 h-6 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-[pulse_0.15s_infinite] mx-0.5" style={{ animationDelay: '50ms' }}></div>
                  <div className="w-1 h-3 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-[pulse_0.2s_infinite]" style={{ animationDelay: '100ms' }}></div>
                </div>
                <div className="overflow-hidden">
                  <p className="text-xl font-bold truncate text-white drop-shadow-[1px_1px_0_rgba(0,255,255,0.8)] glitch-text" data-text="Neon Overdrive">Neon Overdrive</p>
                  <p className="text-sm text-fuchsia-400 font-bold uppercase tracking-widest">AI Core</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#14141d] border-2 border-gray-800 hover:border-cyan-500 transition-colors">
                <div className="w-12 h-12 bg-gray-900 flex items-center justify-center border-2 border-gray-700">
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/></svg>
                </div>
                <div className="overflow-hidden">
                  <p className="text-lg font-bold truncate text-gray-400">Cyber Drone</p>
                  <p className="text-sm text-gray-600 uppercase tracking-widest">Synth AI</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#14141d] border-2 border-gray-800 hover:border-fuchsia-500 transition-colors">
                <div className="w-12 h-12 bg-gray-900 flex items-center justify-center border-2 border-gray-700">
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/></svg>
                </div>
                <div className="overflow-hidden">
                  <p className="text-lg font-bold truncate text-gray-400">Grid Runner</p>
                  <p className="text-sm text-gray-600 uppercase tracking-widest">Procedural</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-auto p-6 bg-[#08080a] border-t-2 border-gray-800">
            <div className="bg-[#14141d] p-4 border-2 border-fuchsia-500 shadow-[2px_2px_0_rgba(0,255,255,0.8)]">
              <p className="text-xs text-cyan-400 uppercase tracking-widest mb-2 font-bold drop-shadow-[1px_1px_0_rgba(255,0,255,0.8)]">Game Stats</p>
              <div className="flex justify-between text-base">
                <span className="text-white">Speed</span>
                <span className="text-fuchsia-400 font-bold drop-shadow-[1px_1px_0_rgba(0,255,255,0.8)]">LVL 8</span>
              </div>
              <div className="flex justify-between text-base mt-2">
                <span className="text-white">Multiplier</span>
                <span className="text-cyan-400 font-bold drop-shadow-[1px_1px_0_rgba(255,0,255,0.8)]">x1.5</span>
              </div>
            </div>
          </div>
        </aside>

        <section className="flex-1 flex flex-col items-center justify-center bg-[#08080a] relative">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#f0f 2px, transparent 2px)', backgroundSize: '40px 40px' }}></div>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#0ff 1px, transparent 1px)', backgroundSize: '15px 15px', backgroundPosition: '5px 5px' }}></div>
          
          <div className="relative p-2 bg-[#050505] border-4 border-fuchsia-500 shadow-[8px_8px_0_rgba(0,255,255,1)]">
            <div className="bg-[#0c0c10] w-[500px] h-[500px] relative overflow-hidden flex items-center justify-center crt-flicker border-2 border-white">
              <SnakeGame onScoreChange={setScore} />
            </div>
          </div>

          <div className="mt-8 flex gap-8 relative z-10">
            <div className="flex flex-col items-center">
              <div className="p-3 bg-fuchsia-900 border-2 border-cyan-400 text-white font-bold text-lg mb-1 shadow-[4px_4px_0_rgba(255,0,255,1)]">WASD / UP</div>
              <span className="text-sm uppercase tracking-widest text-cyan-400 font-bold drop-shadow-[1px_1px_0_rgba(255,0,255,0.8)]">Move</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-3 bg-cyan-900 border-2 border-fuchsia-400 text-white font-bold text-lg mb-1 shadow-[4px_4px_0_rgba(0,255,255,1)]">SPACE</div>
              <span className="text-sm uppercase tracking-widest text-fuchsia-400 font-bold drop-shadow-[1px_1px_0_rgba(0,255,255,0.8)]">Play / Restart</span>
            </div>
          </div>
        </section>
      </main>

      <div className="relative z-40">
        <MusicPlayer />
      </div>
    </div>
  );
}
