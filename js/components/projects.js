const projectNode = document.querySelector(".colorlib-work");
const html = commonTags.html;

const header = html`
  <div class="row">
    <div class="col-md-6 animate-box" data-animate-effect="fadeInLeft">
      <span class="heading-meta">My Projects</span>
    </div>
  </div>`;

const renderProjectType = (projectType) => html`
  <div class="row">
    <div class="col-md-6 animate-box" data-animate-effect="fadeInLeft">
      <h2 class="colorlib-heading animate-box">${projectType}</h2>
    </div>
  </div>`;

const renderIndividualProject = ({name,
  description,
  github,
  image,
  demo,
}) => html`
    <div class="col-md-6 animate-box" data-animate-effect="fadeInRight">
      <div class="project" style="background-image: url(images/${image})">
        <div class="desc">
          <div class="con">
            <h3>${name}</h3>
            <span>${description}</span>
            <ul class="actions">
              ${github ? `
                <li>
                  <div class="colorlib-icon">
                    <i class="icon-social-github"></i>
                  </div>
                  <a href=${github}>Code</a>
                </li>` : ''}
              ${demo ? `
                <li>
                  <div class="colorlib-icon">
                    <i class="icon-world"></i>
                  </div>
                  <a href=${demo}>Demo</a>
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

