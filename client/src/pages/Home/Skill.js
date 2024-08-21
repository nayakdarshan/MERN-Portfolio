import React from 'react'

function Skill({ name, percentage }) {
    return (
      <div className="mb-3">
        <div className="d-flex justify-content-between">
          <span className="fw-500 fs-18">{name}</span>
          <span className="fw-500 fs-14">{percentage}%</span>
        </div>
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${percentage}%` }}
            aria-valuenow={percentage}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>
    );
  }

export default Skill
