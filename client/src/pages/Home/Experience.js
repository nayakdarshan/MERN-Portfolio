import React from "react";

const experience = [
  {
    name: "Tata Consultancy Services",
    location: "Mumbai, India",
    image: "https://mattfarley.ca/img/logos/goodkind.svg",
    roles: [
      {
        role: "Software Engineer",
        duration: "May 2022 - Present",
        description:
          "Worked on Angular, React, Vue, and JavaScript technologies. Worked on Angular, React, Vue, and JavaScript technologies.",
      },
      {
        role: "Software Engineer",
        duration: "May 2022 - Present",
        description:
          "Worked on Angular, React, Vue, and JavaScript technologies. Worked on Angular, React, Vue, and JavaScript technologies.",
      },
    ],
  },
  {
    name: "Tata Consultancy Services",
    location: "Mumbai, India",
    image: "https://mattfarley.ca/img/logos/goodkind.svg",
    roles: [
      {
        role: "Software Engineer",
        duration: "May 2022 - Present",
        description:
          "Worked on Angular, React, Vue, and JavaScript technologies. Worked on Angular, React, Vue, and JavaScript technologies.",
      },
    ],
  },
];
function Experience() {
  return (
    <div className="container-fluid">
      <div className="fs-24 fw-800 text-center mb-3">Work Experience</div>
      <div className="container mx-auto w-50 mt-5">
      {experience.map((company, index) => (
        <div key={index} className="company-section mb-5">
          <div className="company-header d-flex align-items-center">
            <img src={company.image} alt={company.name} className="company-logo me-3" />
            <div>
              <h3>{company.name}</h3>
              <p>{company.location}</p>
            </div>
          </div>
          <div className="roles-section">
            <div className="vertical-line-container">
              <div className="vertical-line"></div>
              <div className="roles-content">
                {company.roles.map((role, idx) => (
                  <div key={idx} className="role-item d-flex">
                    <div className="dot"></div>
                    <div className="role-details">
                      <h4>{role.role}</h4>
                      <p className="text-muted">{role.duration}</p>
                      <p>{role.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}

export default Experience;
