import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import WaveSurfer, { WaveSurferOptions } from 'wavesurfer.js';
import { useAudio } from '@/contexts/AudioContext';

// Extend WaveSurferOptions to include responsive property
interface CustomWaveSurferOptions extends WaveSurferOptions {
  responsive?: boolean;
}

export const AudioPlayer = () => {
  const { currentTrack, setCurrentTrack, isPlaying, setIsPlaying, queue } = useAudio();
  const [volume, setVolume] = useState(0.5);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    if (waveformRef.current && currentTrack?.src) {
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#4a5568',
        progressColor: '#2d3748',
        cursorColor: '#718096',
        barWidth: 2,
        barRadius: 3,
        responsive: true,
        height: 30,
      } as CustomWaveSurferOptions);

      wavesurferRef.current.load(currentTrack.src);
      
      return () => {
        wavesurferRef.current?.destroy();
      };
    }
  }, [currentTrack?.src]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (queue.length > 0) {
        // Play next track in queue
        setCurrentTrack(queue[0]);
      } else {
        setIsPlaying(false);
      }
    };
    
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    
    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [queue, setCurrentTrack, setIsPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (value: number) => {
    if (audioRef.current) {
      audioRef.current.volume = value;
      setVolume(value);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!currentTrack) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className={`fixed bottom-0 left-0 right-0 md:bottom-4 md:left-1/2 md:right-auto md:transform md:-translate-x-1/2 bg-black/80 backdrop-blur-lg md:rounded-lg shadow-xl z-50 transition-all duration-300 ${
          isMinimized ? 'w-auto p-2' : 'w-full md:w-96 p-4'
        }`}
      >
        <audio ref={audioRef} src={currentTrack.src} />
        
        {!isMinimized ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium truncate pr-2">{currentTrack.title}</h3>
                <p className="text-gray-400 text-sm truncate">{currentTrack.artist}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-gray-300 shrink-0"
                onClick={() => setIsMinimized(true)}
              >
                Minimize
              </Button>
            </div>

            <div ref={waveformRef} className="mb-4 w-full" />

            <div className="flex items-center justify-between mb-4 gap-2">
              <span className="text-xs text-gray-400 shrink-0">{formatTime(currentTime)}</span>
              <Slider
                value={[currentTime]}
                max={duration}
                step={0.1}
                className="flex-1"
                onValueChange={([value]) => {
                  if (audioRef.current) {
                    audioRef.current.currentTime = value;
                  }
                }}
              />
              <span className="text-xs text-gray-400 shrink-0">{formatTime(duration)}</span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="hidden md:flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-gray-300"
                  onClick={toggleMute}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </Button>
                <Slider
                  value={[isMuted ? 0 : volume]}
                  max={1}
                  step={0.01}
                  className="w-24"
                  onValueChange={([value]) => handleVolumeChange(value)}
                />
              </div>

              <div className="flex items-center gap-2 mx-auto md:mx-0">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white hover:text-gray-300"
                  disabled={queue.length === 0}
                >
                  <SkipBack size={20} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-gray-300"
                  onClick={togglePlay}
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white hover:text-gray-300"
                  disabled={queue.length === 0}
                >
                  <SkipForward size={20} />
                </Button>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-white hover:text-gray-300"
                onClick={toggleMute}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </Button>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-gray-300"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </Button>
            <div className="text-white">
              <p className="text-sm font-medium truncate">{currentTrack.title}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:text-gray-300 ml-2"
              onClick={() => setIsMinimized(false)}
            >
              Expand
            </Button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
