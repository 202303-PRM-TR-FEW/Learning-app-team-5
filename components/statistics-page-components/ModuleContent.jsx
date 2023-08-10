import React from 'react';

const ModuleContent = ({ module }) => {
  return (
    <div>
      <h2>{module.title}</h2>
      <p>{module.description}</p>
      {module.content.map((contentItem, index) => (
        // Render content with "text" type
        contentItem.type === 'text' && (
          <div key={index} dangerouslySetInnerHTML={{ __html: contentItem.data }} />
        )
      ))}
    </div>
  );
};

export default ModuleContent;