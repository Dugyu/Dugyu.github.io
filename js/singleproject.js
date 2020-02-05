/*
 * SingleProject - The wrapper class for catalog on home page
 * @param _wrapper          -- an array that contains the wrapper to display (one, coule be project or brief)
 * @param _containerId      -- the id of parent responsive container
 */

class SingleProject{
    constructor(_wrapper, _containerId)
    {
        this.contentData = _wrapper;
        this.containerId = _containerId;
    }

    createProjectSlides(_wrapperClass){
        var vis = this;
        vis.container = document.getElementById(vis.containerId);
        var slides = document.createElement('div');
        slides.setAttribute("class", _wrapperClass + "s");
        slides.innerHTML = "";

        this.contentData.forEach(project => {
            slides.innerHTML += project.calcSlideShowHtml(_wrapperClass)
        });
        vis.container.appendChild(slides);
    }
}