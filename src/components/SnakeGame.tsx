import { useEffect, useRef, useState } from 'react';

type Point = { x: number; y: number };

const GRID_SIZE = 20;
const TILE_COUNT = 20; // 20x20 grid

export default function SnakeGame({ onScoreChange }: { onScoreChange: (score: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  // Game state refs (to avoid stale closures in loop)
  const snake = useRef<Point[]>([{ x: 10, y: 10 }]);
  // Initialize with 0 direction so it stays still until input
  const direction = useRef<Point>({ x: 0, y: 0 });
  const food = useRef<Point>({ x: 15, y: 15 });
  const gameLoopRef = useRef<number>();
  const lastRenderTime = useRef<number>(0);
  const snakeSpeed = 10; // moves per second
  const hasStartedMoving = useRef(false);

  const initGame = () => {
    snake.current = [{ x: 10, y: 10 }];
    direction.current = { x: 0, y: 0 };
    hasStartedMoving.current = false;
    let newFood = { x: Math.floor(Math.random() * (TILE_COUNT - 2)) + 1, y: Math.floor(Math.random() * (TILE_COUNT - 2)) + 1 };
    while (newFood.x === 10 && newFood.y === 10) {
        newFood = { x: Math.floor(Math.random() * (TILE_COUNT - 2)) + 1, y: Math.floor(Math.random() * (TILE_COUNT - 2)) + 1 };
    }
    food.current = newFood;
    setScore(0);
    setGameOver(false);
    onScoreChange(0);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault();
      }
      
      const dir = direction.current;
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (dir.y === 0) { direction.current = { x: 0, y: -1 }; hasStartedMoving.current = true; }
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (dir.y === 0) { direction.current = { x: 0, y: 1 }; hasStartedMoving.current = true; }
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (dir.x === 0) { direction.current = { x: -1, y: 0 }; hasStartedMoving.current = true; }
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (dir.x === 0) { direction.current = { x: 1, y: 0 }; hasStartedMoving.current = true; }
          break;
        case ' ':
        case 'Enter':
          if (gameOver) initGame();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOver]);

  // Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = (currentTime: number) => {
      gameLoopRef.current = requestAnimationFrame(render);
      const secondsSinceLastRender = (currentTime - lastRenderTime.current) / 1000;
      if (secondsSinceLastRender < 1 / snakeSpeed) return;
      
      lastRenderTime.current = currentTime;
      update();
      draw(ctx, canvas.width, canvas.height);
    };

    gameLoopRef.current = requestAnimationFrame(render);
    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, [gameOver]);

  const update = () => {
    if (gameOver) return;
    if (!hasStartedMoving.current) return;
    
    // Calculate new head
    const newHead = {
      x: snake.current[0].x + direction.current.x,
      y: snake.current[0].y + direction.current.y,
    };

    // Wall collision
    if (newHead.x < 0 || newHead.x >= TILE_COUNT || newHead.y < 0 || newHead.y >= TILE_COUNT) {
      setGameOver(true);
      return;
    }

    // Self collision
    if (snake.current.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
      setGameOver(true);
      return;
    }

    snake.current.unshift(newHead);

    // Food collision
    if (newHead.x === food.current.x && newHead.y === food.current.y) {
      const newScore = score + 10;
      setScore(newScore);
      onScoreChange(newScore);
      
      // Generate new food not on snake
      let newFood = { x: Math.floor(Math.random() * TILE_COUNT), y: Math.floor(Math.random() * TILE_COUNT) };
      while (snake.current.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
        newFood = { x: Math.floor(Math.random() * TILE_COUNT), y: Math.floor(Math.random() * TILE_COUNT) };
      }
      food.current = newFood;
    } else {
      snake.current.pop(); // Remove tail
    }
  };

  const draw = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const tileW = width / TILE_COUNT;
    const tileH = height / TILE_COUNT;

    // Background
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, width, height);

    // Grid lines (subtle dark neon cyan)
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i < TILE_COUNT; i++) {
        ctx.beginPath();
        ctx.moveTo(i * tileW, 0);
        ctx.lineTo(i * tileW, height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * tileH);
        ctx.lineTo(width, i * tileH);
        ctx.stroke();
    }

    // Food (Neon Pink)
    ctx.fillStyle = '#ff00ff';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#ff00ff';
    const foodX = food.current.x * tileW;
    const foodY = food.current.y * tileH;
    // Shrink the food slightly to fit correctly in grid visual logic
    const padding = 3;
    ctx.fillRect(foodX + padding, foodY + padding, tileW - padding * 2, tileH - padding * 2);
    
    // Reset shadow for snake slightly
    ctx.shadowBlur = 10;
    
    // Snake
    snake.current.forEach((segment, index) => {
      const pad = 1;
      if (index === 0) {
        // Head
        ctx.fillStyle = '#00ffff';
        ctx.shadowColor = '#00ffff';
      } else {
        // Body
        ctx.fillStyle = '#0088ff';
        ctx.shadowColor = '#0088ff';
      }
      ctx.fillRect(segment.x * tileW + pad, segment.y * tileH + pad, tileW - pad * 2, tileH - pad * 2);
    });

    // Reset shadow
    ctx.shadowBlur = 0;
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0c0c10]">
      <canvas 
        ref={canvasRef} 
        width={400} 
        height={400} 
        className="block w-full h-full border-4 border-cyan-500 shadow-[0_0_20px_rgba(0,255,255,0.5)] bg-[#050505]"
      />
      {gameOver && (
        <div className="absolute inset-0 bg-[#050505]/90 flex flex-col items-center justify-center text-center p-6 z-10 w-full h-full crt-flicker border-4 border-fuchsia-500">
          <h2 className="text-6xl font-bold font-pixel text-white glitch-text mb-4" data-text="SYSTEM FAILURE">SYSTEM FAILURE</h2>
          <p className="text-fuchsia-400 font-pixel mb-8 text-3xl font-bold drop-shadow-[2px_2px_0_rgba(0,255,255,0.8)]">Score: {score}</p>
          <button 
            onClick={initGame}
            className="px-8 py-4 border-4 border-cyan-500 text-white font-pixel text-2xl uppercase font-bold hover:bg-cyan-500 hover:text-black transition-colors shadow-[4px_4px_0_rgba(0,255,255,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none focus:outline-none"
          >
            Reboot System
          </button>
        </div>
      )}
      {!gameOver && !hasStartedMoving.current && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none z-10 w-full h-full">
             <div className="bg-[#050505] border-2 border-cyan-500 p-4 shadow-[4px_4px_0_rgba(0,255,255,1)] animate-pulse">
               <p className="text-white font-pixel text-xl uppercase tracking-widest font-bold drop-shadow-[2px_2px_0_rgba(255,0,255,0.8)]">
                  [Press Arrow Keys or WASD]
               </p>
             </div>
        </div>
      )}
    </div>
  );
}
