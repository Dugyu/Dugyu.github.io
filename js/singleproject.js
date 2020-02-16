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

    createTitleBlock(){
        /* Title */

        var vis = this;
        vis.container = document.getElementById(vis.containerId);
        var titleblock = document.createElement('div');
        titleblock.setAttribute('class','project-titleblock')
        titleblock.innerHTML = "";
        this.contentData.forEach(project => {
            titleblock.innerHTML += project.calcTitleBlockHtml()
        });
        vis.container.appendChild(titleblock);
    }
    createAbstractBlock(){
        /* Abstract */
        var vis = this;
        vis.container = document.getElementById(vis.containerId);
        var abstractblock = document.createElement('div');
        abstractblock.setAttribute('class','project-abstractblock')
        abstractblock.innerHTML = "";
        this.contentData.forEach(project => {
            abstractblock.innerHTML += project.calcAbstractBlockHtml()
        });
        vis.container.appendChild(abstractblock);
    }

    createDetailsBlock(){
        /* Abstract */
        var vis = this;
        vis.container = document.getElementById(vis.containerId);
        var detailblock = document.createElement('div');
        detailblock.setAttribute('class','project-detailblock')
        detailblock.innerHTML = "";
        this.contentData.forEach(project => {
            detailblock.innerHTML += project.calcDetailsBlockHtml();
        });
        vis.container.appendChild(detailblock);
    }

    createVideoBlock(_wrapperClass){
        var vis=this;
        vis.container = document.getElementById(vis.containerId);
        var videoblock = document.createElement('div');
        videoblock.innerHTML = "";
        videoblock.setAttribute('class', _wrapperClass)
        this.contentData.forEach(project => {
            videoblock.innerHTML += project.calcVideoBlockHtml();
        });
        vis.container.appendChild(videoblock);
    }

    createImageBlock(_wrapperClass){
        var vis = this;
        vis.container = document.getElementById(vis.containerId);
        /*image*/
        var image = document.createElement('div');
        image.setAttribute("class", _wrapperClass);
        image.innerHTML = "";
        this.contentData.forEach(project => {
            image.innerHTML += project.calcImageBlockHtml();
        });
        vis.container.appendChild(image);
    }

    createProjectSlides(_wrapperClass, _wrapperId){
        var vis = this;
        vis.container = document.getElementById(vis.containerId);
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