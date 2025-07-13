import React from 'react';

const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="bg-placeholder-bg flex-grow">
      <div className="container mx-auto px-4 pt-32 pb-16">
          <h1 className="text-4xl font-bold">{title}</h1>
       </div>
    </div>
  );
};

export default PlaceholderPage; 