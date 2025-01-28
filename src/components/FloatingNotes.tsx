import React from 'react';
import { Music, Music2, Music3, Music4 } from 'lucide-react';

const FloatingNotes = () => {
  const notes = [Music, Music2, Music3, Music4];
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(12)].map((_, i) => {
        const Note = notes[i % notes.length];
        const delay = `${Math.random() * 5}s`;
        const position = `${Math.random() * 100}%`;
        
        return (
          <Note
            key={i}
            className="absolute text-prodpip-highlight/20 animate-float-note"
            style={{
              left: position,
              animationDelay: delay,
              fontSize: `${Math.random() * 20 + 20}px`,
            }}
          />
        );
      })}
    </div>
  );
};

export default FloatingNotes;