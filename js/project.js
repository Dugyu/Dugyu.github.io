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

    get slidesRatio(){
        return this.data.img_ratio;
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

    parseLinksData(_linktype){
        this.links = [];
        if(this.data[_linktype] != "NA"){
            var linkdata = this.data[_linktype].split('</n>');
            linkdata.forEach(d => {
            var titlelink = d.split(',');
            var link = [titlelink[0],titlelink[1]];
            this.links.push(link);
            })
        } 
    }

    calcSlideShowHtml(_slidetype){
        this.parseSlideShowData();
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
        return innerHTML;
    }

    calcAbstractBlockHtml(){
        var innerHTML = 
        "<p>" + this.data.abstract + "</p>";
        return innerHTML;
    }

    calcDetailCollapseHtml(){
        if (this.data.content_details != "NA" && this.data.content_details != ""){
            var detailtitle = ((this.data.detail_title == "") ? 'Details' : this.data.detail_title);
            var innerHTML = "<input id='project-detailcollapse' type='checkbox' checked>" +
            "<label for='project-detailcollapse'>" + detailtitle.toUpperCase() + "</label>"
            return innerHTML;
        }else{
            return "";
        }
    }
    calcDetailsBlockHtml(){
        if(this.data.content_details != "NA"){
            var paragrahs = this.data.content_details.split("</n>");
            var innerHTML = "<div id='project-detailexpand'><section>";
            paragrahs.forEach(p =>{
                innerHTML += "<p>" + p + "</p>";
            })
            innerHTML += "</section></div>"
            return innerHTML;
        }else{
            return "";
        }
    }

    calcExplanationHtml(_exptype){
        var innerHTML = "<div>" + this.data[_exptype] + "</div>";
        return innerHTML;
    }

    calcExplanationSwitchButtonHtml(){
        if (this.data.expswitch == ""){
            this.expswitch = ['Concept','Process','Result'];
        }else{
            this.expswitch = this.data.expswitch.split(',');
        }
        var innerHTML = 
        "<input type='radio' name='exptype' value='story' id='expswitch-story' class='expswitch-story' checked hidden/>"
        +
        "<label for='expswitch-story'>" + this.expswitch[0] + "</label>"
        +
        "<input type='radio' name='exptype' value='process' id='expswitch-process' class='expswitch-process' hidden/>"
        +
        "<label for='expswitch-process'>" + this.expswitch[1] + "</label>"
        +
        "<input type='radio' name='exptype' value='result' id='expswitch-result' class='expswitch-result' hidden/>"
        +
        "<label for='expswitch-result'>"+ this.expswitch[2] + "</label>";
        return innerHTML;
    }

    get collaboration(){
        var text = "Individual Work";
        if (this.data.collaboration != "Individual"){
            if(this.data.collaboration.split(',').length > 1){
                text = "Collaborators: " + this.data.collaboration;
            }else{
                text = "Collaborator: " + this.data.collaboration;
            }
        }
        return text;
    }
    get instruction(){
        var text = "";
        if (this.data.instruction != "NA"){
            if(this.data.instruction.split(',').length > 1){
                text = "Instructors: " + this.data.instruction;
            }else{
                text = "Instructor: " + this.data.instruction;
            }
        }
        return text;
    }

    get buildwith(){
        var text = "Platform & Tech: ";
        text += this.data.platform + ", " +this.data.tech;
        return text;
    }    
    
    get notes(){
        var text = "";
        if (this.data.notes != "NA"){
            text = this.data.notes;
        }
        return text;
    }
    
    getlinksHtml(){
        this.parseLinksData('otherlinks');
        var innerHTML = "";
        // github link
        var link_github = "";
        if (this.data.github != "NA"){
            link_github += "<br>"; 
            link_github += "<a href='https://github.com/" +
            this.data.github + "' " +"target='_blank'><strong>GITHUB REPO</strong></a>"
        }
        // other links
        var link_others = "";
        this.links.forEach(link => {
            link_others += "<br>";
            link_others += "<a href='" + link[1] + "' " + 
            "target='_blank'><strong>" + link[0].toUpperCase() + "</strong></a>";
        })

        innerHTML = link_github + link_others;
        return innerHTML;
    }

    calcCreditsHtml(){
        var credits = [this.data.type,this.collaboration];
        if (this.instruction != ""){credits.push(this.instruction);}
        credits.push(this.buildwith);
        if (this.notes != ""){credits.push(this.notes);}

        
        var innerHTML = "<p>";

        credits.forEach((line,i) =>{
            if (i!=0){innerHTML += "<br>";}
            innerHTML += line;
        })
        innerHTML+= this.getlinksHtml();
        innerHTML+= "</p>";
        return innerHTML;
    }


    calcLinksBlockHtml(){
        this.parseLinksData('otherlinks');
        var innerHTML = "";
        // github link
        var link_github = "";
        if (this.data.github != ""){
            link_github = "<div class='animlink'><a href='https://github.com/" +
            this.data.github + "' " +"target='_blank'><strong>GITHUB REPO</strong></a></div>"
        }
        // other links
        var link_others = "";
        this.links.forEach(link => {
            link_others += "<div class='animlink'><a href='" + link[1] + "' " + 
            "target='_blank'><strong>" + link[0].toUpperCase() + "</strong></a></div>";
        })

        innerHTML = link_github + link_others;
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

    get projectTitleButton(){
        var innerHTML =  "<div class='project-title'><div><a href='" + this.projectPath + "'>" +
        this.data.title.toUpperCase() + "</a></div></div>";
        return innerHTML;
    }

    get projectCoverImage(){
        var innerHTML =  "<img src='" + this.projectPath + "static/"+ this.data.cover_img +"' "
        + "alt='" + this.data.cover_img + "' " + "class='project-cover'>";
        return innerHTML;
    }
    get projectCoverVideo(){
        var innerHTML = "<video class='project-cover' loop muted preload='metadata' poster='" + 
        this.projectPath + "static/"+ this.data.cover_img + "' >" +
        "<source src='" + this.projectPath + "static/" + this.data.cover_video + "' "
        + "type='video/mp4'>" + "</video>";
        return innerHTML;
    }

    get projectInlineDetail(){
        var innerHTML = "<div class='project-inlinedetail'>" +
        "<div><span>" + this.data.subtitle + "</span></div>" + "<div><span>" + this.data.type + " | " + 
        this.data.platform +  " | " + this.data.tech + " | " + this.data.year + "</span></div>"+
        "</div>"
        return innerHTML;
    }

    calcCatalogHtml(){
        var innerHTML = ""
        if (this.videoEnabled == false){
            innerHTML = this.projectCoverImage + this.projectInlineDetail +
            this.projectTitleButton
        }
        else{
            innerHTML = this.projectCoverVideo + this.projectInlineDetail +
            this.projectTitleButton;
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