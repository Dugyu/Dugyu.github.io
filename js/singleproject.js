/*
 * SingleProject - The wrapper class for the content in a project page
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
        if (detailblock.innerHTML != ""){
            vis.container.appendChild(detailblock);
        }
    }

    createCreditsBlock(_wrapperClass){
        /*Credits*/
        var vis = this;
        vis.container = document.getElementById(vis.containerId);
        var creditsblock = document.createElement('div');
        creditsblock.setAttribute('class',_wrapperClass);
        creditsblock.innerHTML = "";
        this.contentData.forEach(project => {
            creditsblock.innerHTML += project.calcCreditsHtml();
        });
        vis.container.appendChild(creditsblock);
    }

    createLinksBlock(_wrapperClass){
        var vis=this;
        vis.container = document.getElementById(vis.containerId); 
        var linksblock = document.createElement('div');
        linksblock.innerHTML = "";
        linksblock.setAttribute('class', _wrapperClass)
        this.contentData.forEach(project => {
            linksblock.innerHTML += project.calcLinksBlockHtml();});
        if (linksblock.innerHTML != ""){
            vis.container.appendChild(linksblock);
        }
    }


    createVideoBlock(_wrapperClass){
        var vis=this;
        vis.container = document.getElementById(vis.containerId);
        var videoblock = document.createElement('div');
        videoblock.innerHTML = "";
        videoblock.setAttribute('class', _wrapperClass)
        this.contentData.forEach(project => {
            videoblock.innerHTML += project.calcVideoBlockHtml(true);
        if (project.longVideoEnabled){
            vis.container.appendChild(vis.createVideoSwitchButton()); // add video switch button
            $('input[name=videotype]').change(function(){
                var value = $( 'input[name=videotype]:checked' ).val();
                if(value == "long"){
                    vis.updateVideoBlock(_wrapperClass,false);
                }else{
                    vis.updateVideoBlock(_wrapperClass,true);
                }
            });
        }
        vis.container.appendChild(videoblock);
    });


    }
    updateVideoBlock(_wrapperClass,_useCover){
        var vis=this;
        var videoblocks = document.getElementsByClassName(_wrapperClass);
        vis.contentData.forEach(project => {
            for(var i = 0; i < videoblocks.length; i++) {
                videoblocks[i].innerHTML = project.calcVideoBlockHtml(_useCover);
            }
        });
    }

    createExplanationBlock(){
        var vis=this;
        vis.container = document.getElementById(vis.containerId);
        vis.container.appendChild(this.createExplanationSwitchButton());

        var explanationText = document.createElement('div');
        explanationText.setAttribute('class','exptext');
        vis.container.appendChild(explanationText);
        vis.updateExplanationText('exptext', 'story');

        $('input[name=exptype]').change(function(){
            var value = $( 'input[name=exptype]:checked' ).val();
            vis.updateExplanationText('exptext', value);
            if (value == "result"){
               var label = document.getElementById('expswitch-story');
                label.setAttribute('class','expswitch-story third-selected');
            }else{
                var label = document.getElementById('expswitch-story');
                label.setAttribute('class','expswitch-story');
            };
        });
    }

    updateExplanationText(_wrapperClass,_exptype){
        var vis=this;
        var explanationText = document.getElementsByClassName(_wrapperClass);
        vis.contentData.forEach(project => {
            for(var i = 0; i < explanationText.length; i++) {
                explanationText[i].innerHTML = project.calcExplanationHtml(_exptype);
            }
        });
    }

    createExplanationSwitchButton(){
        var switchbutton = document.createElement('div');
        switchbutton.setAttribute('class', 'expswitch-container');
        switchbutton.innerHTML = 
        "<input type='radio' name='exptype' value='story' id='expswitch-story' class='expswitch-story' checked hidden/>"
        +
        "<label for='expswitch-story'>Concept</label>"
        +
        "<input type='radio' name='exptype' value='process' id='expswitch-process' class='expswitch-process' hidden/>"
        +
        "<label for='expswitch-process'>Process</label>"
        +
        "<input type='radio' name='exptype' value='result' id='expswitch-result' class='expswitch-result' hidden/>"
        +
        "<label for='expswitch-result'>Result</label>"
        return switchbutton;
    }


    createVideoSwitchButton(){
        var switchbutton = document.createElement('div');
        switchbutton.setAttribute('class', 'videoswitch-container');

        switchbutton.innerHTML = 
        "<input type='radio' name='videotype' value='short' id='videoswitch-shortvideo' checked hidden/>"
        +
        "<label for='videoswitch-shortvideo'>Short</label>"
        +
        "<input type='radio' name='videotype' value='long' id='videoswitch-longvideo' hidden/>"
        +
        "<label for='videoswitch-longvideo'>Long</label>"
        return switchbutton;
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
            slides.style.paddingTop = project.slidesRatio;
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