import React from "react";
import Skill from "./Skill";

const skills = [
    { name: "Angular", percentage: 90 },
    { name: "React", percentage: 85 },
    { name: "Vue", percentage: 80 },
    { name: "JavaScript", percentage: 95 },
    { name: "CSS", percentage: 75 } 
  ];
  
function About() {
  return (
    <div className="container-fluid px-0">
      <div className="about-section">
        <div className="container d-flex align-items-center justify-content-center">
          <div className="d-flex align-items-center justify-content-center flex-column">
            <div className="fs-24 fw-800 text-center mb-5">
              Hi, I’m Darshan Nayak. Nice to meet you.
            </div>
            <div className="fs-20 fw-500 text-center">
              As a Computer Science Engineer with expertise as an Angular
              Developer, I have honed my skills in creating dynamic and engaging
              web applications utilizing the Angular framework. My proficiency
              in JavaScript, HTML, and CSS, enables me to develop intuitive
              interfaces with a user-friendly design. Moreover, my experience in
              integrating applications with REST APIs and database systems
              allows me to deliver solutions that are both secure and reliable.
              In addition, I possess extensive knowledge of Agile software
              development methodologies, which enables me to work
              collaboratively with my team to achieve our objectives
              efficiently. Furthermore, I am well-versed in working
              independently while ensuring a high standard of quality for the
              software delivered. I am dedicated to utilizing technology to
              solve complex problems and deliver high-quality software
              solutions.
            </div>
          </div>
        </div>
      </div>
      <div className="skills-section container">
        <div className="skills-card">
          <div className="fs-24 fw-800 text-center mb-3">Technical Skills</div>
          {skills.map((skill) => (
            <Skill key={skill.name} name={skill.name} percentage={skill.percentage} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
