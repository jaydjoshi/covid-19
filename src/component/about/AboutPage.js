import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/about-page.css';

// Since this component is simple and static, there's no parent container for it.
const AboutPage = () => {
  return (
    <div>
      <h2>About me</h2>
      <p>
        My name is Jay, I am a fullstack developer. I write bogs at https://distinguisheddeveloper.wordpress.com/
      </p>
    </div>
  );
};

export default AboutPage;
