/*
 * Project - The wrapper class for project in catalog
 * @param _data						-- the object that contains image name, title, description
 * @param _path                        -- string, the relative path to index.html, default to ""

 */

class Project{


    constructor(_data, _path="")
    {
        this.data = _data;
        this.path = _path;
        this.dataPath = "projects/" + this.data.title.toLowerCase() + "/";
    }

    get projectPath(){
        return this.path + this.dataPath;
    }

    get videoEnabled(){
        if (this.data.cover_video == ""){
            return false;
        }else{
            return true;
        }
    }

    addToCatalog(_parentEleId){
        var parentElement = document.getElementById(_parentEleId);

        var project_wrapper = document.createElement("div");
        project_wrapper.setAttribute("class","project-wrapper");
        project_wrapper.setAttribute("data-aos", "fade-in");
        project_wrapper.innerHTML = this.calcCatalogHtml();
        parentElement.appendChild(project_wrapper);
    }

    calcCatalogHtml(){

        var innerHTML = ""
        if (this.videoEnabled == false){
            innerHTML = 
            "<a href='" + this.projectPath + "'>" +
                "<img src='" + this.projectPath + "static/"+ this.data.cover_img +"' "
                    + "alt='" + this.data.cover_img + "' " + "class='project-cover'>" + 
            "</a>" +
            "<div class='project-title animlink'><h5><a href='" + this.projectPath + "'>" +
             this.data.title.toUpperCase() + "</a></h5></div>" +
            "<div class='project-description'><p>" + this.data.abstract + "</p></div>"
        }else{
            innerHTML = 
                "<video class='project-cover' loop preload=metadata poster='" + 
                 this.projectPath + "static/"+ this.data.cover_img + "' >" +
                
            "<source src='" + this.projectPath + "static/" + this.data.cover_video + "' "
                + "type='video/mp4'>" +
            "</video>"+

               /*  "<img src='" + this.projectPath + "static/"+ this.data.cover_img +"' "
                    + "alt='" + this.data.cover_img + "' " + "class='project-cover'>" +  */
            "<div class='project-title animlink'><h5><a href='" + this.projectPath + "'>" +
             this.data.title.toUpperCase() + "</a></h5></div>" +
            "<div class='project-description'><p>" + this.data.abstract + "</p></div>"
        }
        return innerHTML;
    }



    addLinkOnMenu(_ulNodeId, _totalNum){
        var link = document.createElement("li");
        link.style.height = "calc(100% / " + _totalNum + ")";
        var link_a = document.createElement("a");
        link_a.innerHTML = this.data.title;
        link_a.setAttribute("class","menu_link");
        link_a.setAttribute("href",this.path + this.dataPath);
        link.appendChild(link_a);
        var ulNode = document.getElementById(_ulNodeId);
        ulNode.appendChild(link);
    }


}