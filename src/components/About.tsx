import React from 'react';
import { Award, Mic2, Music2, Trophy } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  const achievements = [
    {
      year: '2020',
      title: t('startedProduction'),
      description: t('beganJourney'),
      icon: Music2,
    },
    {
      year: '2021',
      title: t('majorCollaboration'),
      description: t('workedWith'),
      icon: Mic2,
    },
    {
      year: '2022',
      title: t('industryRecognition'),
      description: t('receivedAwards'),
      icon: Trophy,
    },
    {
      year: '2023',
      title: t('studioExpansion'),
      description: t('launchedStudio'),
      icon: Award,
    },
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-prodpip-accent to-prodpip-primary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-prodpip-text">
          {t('journeySoFar')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <div
              key={achievement.year}
              className="p-6 rounded-lg bg-prodpip-primary/50 backdrop-blur-sm hover:bg-prodpip-primary/70 transition-all duration-300"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <achievement.icon className="w-12 h-12 mb-4 text-prodpip-highlight" />
              <h3 className="text-xl font-bold mb-2 text-prodpip-text">{achievement.year}</h3>
              <h4 className="text-lg font-semibold mb-2 text-prodpip-text/90">{achievement.title}</h4>
              <p className="text-prodpip-text/70">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;