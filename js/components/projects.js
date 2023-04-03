const projectNode = document.querySelector(".colorlib-work");

const header = html`
  <div class="row">
    <div class="col-md-6 animate-box" data-animate-effect="fadeInLeft">
      <h2 class="heading-meta">My Projects</h2>
    </div>
  </div>`;

const renderProjectType = (projectType) => html`
  <div class="row">
    <div class="col-md-6 animate-box" data-animate-effect="fadeInLeft">
      <h3 class="animate-box">${projectType}</h3>
    </div>
  </div>`;

const renderIndividualProject = ({name,
  description,
  github,
  image,
  demo,
}) => html`
    <div class="col-md-6 animate-box" data-animate-effect="fadeInRight">
      <div class="project" style="background-size: cover; background-image: url(images/${image})">
        <div class="desc">
          <div class="con">
            <h4>${name}</h4>
            <span>${description}</span>
            <ul class="actions">
              ${github ? `
                <li>
                  <div class="colorlib-icon">
                    <i class="icon-social-github"></i>
                  </div>
                  <a target="_blank" href=${github}>Code</a>
                </li>` : ''}
              ${demo ? `
                <li>
                  <div class="colorlib-icon">
                    <i class="icon-world"></i>
                  </div>
                  <a target="_blank" href=${demo}>Demo</a>
                </li>
              ` : ''}
            </ul>
          </div>
        </div>
      </div>
    </div>`;

const renderProjects = projects.map(({type, projects}) =>
  html`
    ${renderProjectType(type)}
    <div class="row">
      ${projects.map(renderIndividualProject)}
    </div>`);

projectNode.innerHTML = html`
  <div class="colorlib-narrow-content">
    ${header}
    ${renderProjects}
  </div>`;

