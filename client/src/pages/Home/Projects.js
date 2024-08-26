import React from 'react'
const projects = [
    {
        name: "Tata Consultancy Services",
        location: "Mumbai, India",
        image: "https://mattfarley.ca/img/logos/goodkind.svg",
        description:
          "Worked on Angular, React, Vue, and JavaScript technologies. Worked on Angular, React, Vue, and JavaScript technologies.",
        certificateUrl:'https://drive.google.com/file/d/1Hqy7n9bZ7r5f7Oy9h2S6zX8p8QX4CQXb/view?usp=sharing'
    },
    {
        name: "Tata Consultancy Services",
        location: "Mumbai, India",
        image: "https://mattfarley.ca/img/logos/goodkind.svg",
        description:
          "Worked on Angular, React, Vue, and JavaScript technologies. Worked on Angular, React, Vue, and JavaScript technologies.",
        certificateUrl:'https://drive.google.com/file/d/1Hqy7n9bZ7r5f7Oy9h2S6zX8p8QX4CQXb/view?usp=sharing'
    },
    {
        name: "Tata Consultancy Services",
        location: "Mumbai, India",
        image: "https://mattfarley.ca/img/logos/goodkind.svg",
        description:
          "Worked on Angular, React, Vue, and JavaScript technologies. Worked on Angular, React, Vue, and JavaScript technologies.",
        certificateUrl:'https://drive.google.com/file/d/1Hqy7n9bZ7r5f7Oy9h2S6zX8p8QX4CQXb/view?usp=sharing'
    }
]
function Projects() {
  return (
    <div className="container-fluid px-0">
    <div className="projects-section mt-5">
        <div className="fs-24 fw-800 text-center mb-2">Projects</div>
        <div className="fs-16 fw-500 text-center mb-3">Here are a few past projects I have done. more to come..</div>
        <div className='container mt-5'>
            <div className="row">
                {projects.map((cert, index) => (
                    <div className="col-12 col-md-4 mb-4" key={index}>
                        <div className="cert-card">
                            <div>
                                <img src={cert.image} alt={cert.name} className="cert-image img-center" />
                                <div className="cert-hover">
                                    <h5>{cert.name}</h5>
                                    <p>{cert.description}</p>
                                    <a href={cert.certificateUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer">View Certificate</a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
</div>
  )
}

export default Projects
