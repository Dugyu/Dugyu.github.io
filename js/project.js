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
        this.dataPath = "projects/" + this.data.key.toLowerCase() + "/";
        this.parseSlideShowData();
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

    get longVideoEnabled(){
       if (this.data.content_videoprovider == "NA"){
           return false;
       }else{
           return true;
       }
    }

    get slidesEnabled(){
        if (this.data.content_slides == ""){
            return false;
        }else{
            return true;
        }
    }

    addToCatalog(_parentEleId){
        // not used 
        var parentElement = document.getElementById(_parentEleId);
        var project_wrapper = document.createElement("div");
        project_wrapper.setAttribute("class","project-wrapper");
        project_wrapper.setAttribute("data-aos", "fade-in");  
        project_wrapper.innerHTML = this.calcCatalogHtml();
        parentElement.appendChild(project_wrapper);
    }

    
    
    parseSlideShowData(){
        this.slidesData = this.data.content_slides.split(',');
    }

    calcSlideShowHtml(_slidetype){
        var innerHTML = "";
        if (this.slidesEnabled == true){
            this.slidesData.forEach((imgname,i) => {
                if (i==0){
                    innerHTML += "<img class='"+  _slidetype +  " showing' src='" + this.projectPath + "static/"
                    + imgname + "'" + "alt='" + imgname + "'>"
                }else{
                    innerHTML +=  "<img class='"+  _slidetype +  "' src='" + this.projectPath + "static/"
                    + imgname + "'" + "alt='" + imgname + "'>"
                }   
            });
        }else{
            innerHTML = "<img src='" + this.projectPath + "static/"+ this.data.cover_img +"' "
            + "alt='" + this.data.cover_img + "' " + "class='" + _slidetype + " showing'>"; 
        }
        return innerHTML;
    }

    calcTitleBlockHtml(){
        var innerHTML = 
        "<h3>" + this.data.title.toUpperCase() + "</h3>";
        //"<h5>" + this.data.year + " " + this.data.season + "</h5>";
        return innerHTML;
    }

    calcAbstractBlockHtml(){
        var innerHTML = 
        "<p>" + this.data.abstract + "</p>";
        return innerHTML;
    }

    calcDetailsBlockHtml(){
        var paragrahs = this.data.content_details.split("</n>");
        var innerHTML = "";
        paragrahs.forEach(p =>{
            innerHTML += "<p>" + p + "</p>";
        })
        return innerHTML;
    }

    calcVideoBlockHtml(_useCover){
        var innerHTML = "";
        var type = "NA";
        if (_useCover != true){
            type = this.data.content_videoprovider;
        }
        switch (type){
            case "Vimeo":
                innerHTML = 
                "<div class='iframe-container'>" +   
                    "<iframe src='https://player.vimeo.com/video/" + this.data.content_video + "?loop=1&title=0&byline=0&portrait=0'" +
                    "width='960' height='540' frameborder='0' allow='autoplay; fullscreen' allowfullscreen></iframe>"
                + "</div>";
                break;
            case "Youtube":   
                innerHTML=    
                "<div class='iframe-container'>" +            
                    "<iframe width='' height='' src='https://www.youtube.com/embed/" + this.data.content_video + "' " 
                    +"frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope' allowfullscreen></iframe>"
                + "</div>";
                break;
            case "NA":
                innerHTML="<video class='project-contentvideo' controls loop preload='metadata' poster='" + 
                this.projectPath + "static/"+ this.data.cover_img + "' >" +
                "<source src='" + this.projectPath + "static/" + this.data.cover_video + "' "
                + "type='video/mp4'>" +
                "</video>";
                break;
            default:
                innerHTML = "";
        }
        return innerHTML;
    }

    calcCatalogHtml(){
        var innerHTML = ""
        if (this.videoEnabled == false){
            innerHTML = 
                "<img src='" + this.projectPath + "static/"+ this.data.cover_img +"' "
                    + "alt='" + this.data.cover_img + "' " + "class='project-cover'>" + 
            "<div class='project-title animlink'><h5><a href='" + this.projectPath + "'>" +
             this.data.title.toUpperCase() + "</a></h5></div>" +
            "<div class='project-description'><p>" + this.data.abstract + "</p></div>"
        }else{
            innerHTML = 
            "<video class='project-cover' loop muted preload='metadata' poster='" + 
                 this.projectPath + "static/"+ this.data.cover_img + "' >" +
                
            "<source src='" + this.projectPath + "static/" + this.data.cover_video + "' "
                + "type='video/mp4'>" +
            "</video>"+
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