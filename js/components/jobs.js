const node = document.querySelector(".colorlib-experience");

node.innerHTML = '';
const title = `
  <div class="row">
	  <div class="col-md-6 col-md-offset-3 col-md-pull-3 animate-box" data-animate-effect="fadeInLeft">
		  <span class="heading-meta">Work Experience</span>
		</div>
	</div>
`;

const joblists = jobs.map(({
  position,
  company,
  duration,
  tasks
}, index) => `
  <article class="timeline-entry animate-box" data-animate-effect="fadeInLeft">
    <div class="timeline-entry-inner">
      <div class="timeline-icon color-${index + 1}">
        <i class="icon-pen2"></i>
      </div>

      <div class="timeline-label">
        <h2><a href="#">${position}, ${company}</a>
        <div><span>${duration}</span></div></h2>
          <p>
            <ul>
              ${tasks.map(task => `<li>${task}</li>`)}
            </ul>
          </p>
        </div>
      </div>
  </article>
`);

const endingIcon = `
      <article class="timeline-entry begin animate-box" data-animate-effect="fadeInBottom">
        <div class="timeline-entry-inner">
          <div class="timeline-icon color-none" />
        </div>
      </article>
`;

node.innerHTML = `
<div class="colorlib-narrow-content">
  ${title}
  <div class="row">
    <div class="col-md-12">
      <div class="timeline-centered">
        ${joblists}
        ${endingIcon}
      </div>
    </div>
  </div>
</div>
`
