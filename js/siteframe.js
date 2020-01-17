/*
 * Siteframe - The wrapper class for site commons
 * @param _catalogData						-- the object that contains all project data
 * @param _typeClass					-- string, page type: "catalog", "single_project"
 * @param _path                        -- string, the relative path to index.html, default to ""
 */
class Siteframe{
    constructor(_catalogData, _briefData, _typeClass, _path="")
    {
        this.contentId = "content-container";
        this.projectList = [];
        this.briefList = [];
        this.catalogData = _catalogData;
        this.briefData = _briefData;
        this.typeClass = _typeClass;
        this.path = _path;
        this.initSiteCommons();
        this.initContentCommons(_typeClass);
        this.initMenuToggle();
        this.initMenuOverlay();
   }

    get scrollY(){
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    }

    initSiteCommons(){
        /* 
        <div class="sitename">
            <h1 class="display-4">
                DUGYU
            </h1>
        </div> 
        */

        var sitename_container = document.getElementById('sitename-container');

        
        var sitename_div =  document.createElement('div');
        sitename_div.setAttribute('class', "sitename");
        
        var sitename_text = document.createElement('h1');
        sitename_text.setAttribute("class","display-4");
        sitename_text.setAttribute("id","sitename-logo");
        sitename_text.innerHTML = "DUGYU";
        
        var sitename_img =  document.createElement('img');
        sitename_img.setAttribute('src',this.path + "static/D_U_G_Y_U.png");
        sitename_img.setAttribute('class', "sitename_char");
        sitename_img.setAttribute('id', "sitename-char-logo");

        sitename_div.appendChild(sitename_text);
        sitename_container.appendChild(sitename_div);  
        sitename_container.appendChild(sitename_img);


    $(window).scroll(function(){
        if(this.scrollY > 0){
            $('.sitename').attr("class","sitename onscroll");
            $('.sitename_char').attr("class","sitename_char onscroll");
            $('#sitename-container').attr("class","sitename_container onscroll")
        }else{
            $('.sitename').attr("class","sitename"); 
            $('.sitename_char').attr("class","sitename_char");
            $('#sitename-container').attr("class","sitename_container")

        }
    })
        /* $('#sitename-logo').click(function() {
            $('.sitename').toggleClass('onscroll');
        });      */ 
    }

    initContentCommons(_typeClass){
        /* 
        <div class="row">
            <div class="col-md-10 offset-md-1">
                <div id="content-container"></div>
            </div>
        </div> 
        */
        
        var responsive_container = document.getElementById('responsive-container');
        
        var row =  document.createElement('div');
        row.setAttribute('class', "row");
        
        var col = document.createElement('div');
        col.setAttribute("class","col-md-10 offset-md-1");
        
        var content_container = document.createElement('div');
        content_container.setAttribute("id", this.contentId);
        content_container.setAttribute("class", _typeClass);  

        col.appendChild(content_container);
        row.appendChild(col);
        responsive_container.appendChild(row);
    }

    initMenuToggle(){
        /*         
        <span class="top">&nbsp;</span>
        <span class="middle">&nbsp;</span>
        <span class="bottom">&nbsp;</span> 
        */

        var button_container = document.getElementById('menu-toggle');
        var classname = ["top", "middle", "bottom"]
        for (var i =0; i<3; i++){
            var span = document.createElement('span');
            span.setAttribute("class",classname[i]);
            span.innerHTML = "&nbsp;";
            button_container.appendChild(span);
        }
    }

    initMenuOverlay(){
        /* 
        <nav class="overlay_nav">
            <ul id="menu"></ul>
        </nav> 
        */

        var overlay_container = document.getElementById('menu-overlay');
        var nav = document.createElement("nav");
        nav.setAttribute("class","overlay_nav");
        var ul = document.createElement("ul");
        ul.setAttribute("id","menu");
        nav.appendChild(ul);
        overlay_container.appendChild(nav);

        this.briefData.forEach(e => {
            var brief = new Brief(e, this.path, e.data_path);
            brief.addLinkOnMenu('menu',this.catalogData.length+this.briefData.length);
            this.briefList.push(brief);
        })

        this.catalogData.forEach(e => {
            var project = new Project(e, this.path);
            project.addLinkOnMenu('menu',this.catalogData.length+this.briefData.length);
            this.projectList.push(project);
        });

        $('#menu-toggle').click(function() {
            $(this).toggleClass('active');
            $('#menu-overlay').toggleClass('open');
           });

        $('.menu_link').click(function(e){
            e.preventDefault();

            $('#menu-toggle').toggleClass('active');
            $('#menu-overlay').toggleClass('open')

            var linkUrl = $(this).attr('href');
            setTimeout(function(url) { window.location = url; }, 200, linkUrl);
        })
    }


    createContentOfCatalog(){
        this.catalog = new Catalog(this.projectList,this.contentId, "project-wrapper");
        var covervideos = document.querySelectorAll("video.project-cover");
        covervideos.forEach(video =>{
            video.load();
            video.addEventListener("mouseover",function(){
                var thisvideo = this;
                var playPromise = thisvideo.play();
                if (playPromise !== undefined){
                    playPromise.then( _ =>{
                         $(thisvideo).toggleClass('playing')
                    })
                    .catch(error => {
                    });
                }
            })
        })
    }
}