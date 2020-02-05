/*
 * SingleProject - The wrapper class for catalog on home page
 * @param _contentData          -- an array that contains the data to display (one, coule be project or brief)
 * @param _containerId      -- the id of parent responsive container
 */

class SingleProject{
    constructor(_contentData, _containerId)
    {
        this.contentData = _contentData;
        this.containerId = _containerId;
        this.slides = {};
        this.currentSlide = {};
        this.setInterval = {};
    }
    createProjectSlides(_wrapperClass, _wrapperId){
        var vis = this;
        vis.container = document.getElementById(vis.containerId);
        /*title*/
        var titleblock = document.createElement('div');
        titleblock.setAttribute('class','project-titleblock')
        titleblock.innerHTML = "";
        this.contentData.forEach(project => {
            titleblock.innerHTML += project.calcTitleBlockHtml()
        });
        vis.container.appendChild(titleblock);
        /*slideshow*/
        var slides = document.createElement('div');
        slides.setAttribute("class", _wrapperClass + "s");
        slides.setAttribute("id", _wrapperId);
        slides.innerHTML = "";
        this.contentData.forEach(project => {
            slides.innerHTML += project.calcSlideShowHtml(_wrapperClass)
        });
        vis.container.appendChild(slides);



        this.addSlidesTransition(_wrapperClass, _wrapperId);
    }

    addSlidesTransition(_wrapperClass, _wrapperId){

        this.slides[_wrapperId] = document.querySelectorAll('#'+_wrapperId + ' .'+_wrapperClass);
        this.currentSlide[_wrapperId] = 0;
        var vis = this;
        var setInterval = window.setInterval(function(){vis.nextSlide(_wrapperClass,_wrapperId);},2000);
    }
    nextSlide(_wrapperClass,_wrapperId){
        var currentSlide = this.currentSlide[_wrapperId];
        var slides = this.slides[_wrapperId];
        slides[currentSlide].className = _wrapperClass;
        currentSlide = (currentSlide+1)%slides.length;
        slides[currentSlide].className = _wrapperClass + " showing";
        this.currentSlide[_wrapperId] = currentSlide;
    }
}