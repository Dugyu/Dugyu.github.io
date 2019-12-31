/*
 * Siteframe - The wrapper class for site commons
 * @param _catalogData						-- the object that contains all project data
 * @param _typeClass					-- string, page type: "catalog", "single_project"
 * @param _path                        -- string, the relative path to index.html, default to ""
 */
class Siteframe{

    catalogData;
    briefData;
    projectList = [];
    briefList = [];
    typeClass;
    path;

    contentId = "content-container";

    constructor(_catalogData, _briefData, _typeClass, _path="")
    {
        this.catalogData = _catalogData;
        this.briefData = _briefData;
        this.typeClass = _typeClass;
        this.path = _path;
        this.initSiteCommons();
        this.initContentCommons(_typeClass);
        this.initMenu();
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
        sitename_text.innerHTML = "DUGYU";
        
        sitename_div.appendChild(sitename_text);
        sitename_container.appendChild(sitename_div);        
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


    initMenu(){
        /*         
        <span class="top">&nbsp;</span>
        <span class="middle">&nbsp;</span>
        <span class="bottom">&nbsp;</span> 
        */







        
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
        this.projectList.forEach(project => {
            project.addToCatalog(this.contentId);
        })
    }
}