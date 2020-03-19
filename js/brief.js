/*
 * Brief - The wrapper class for introductory page content
 * @param _data						-- the object that contains image name, title, description
 * @param _path                        -- string, the relative path to index.html, default to ""
 * @param _dataPath                   -- string, the relative path from index.html to the brief data folder
 */

class Brief{

    constructor(_data, _path="", _dataPath="")
    {
        this.data = _data;
        this.path = _path;
        this.dataPath = _dataPath;
    }

    get projectPath(){
        return this.path + this.dataPath;
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

    calcImageBlockHtml(){
        var innerHTML =  "<img src='" + this.projectPath + "static/"+ this.data.cover_img +"' "
        + "alt='" + this.data.cover_img + "' " + "class='brief-cover'>";
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
    getlinksHtml(){
        this.parseLinksData('links');
        var innerHTML = "";
        //links
        var links = "";
        this.links.forEach((link,i) => {
            links += "<br>";
            links += "<a href='" + this.projectPath + "static/"+ link[1] + "' " + 
            "target='_blank'><strong>" + link[0].toUpperCase() + "</strong></a>";
        })
        innerHTML = links;
        return innerHTML;
    }
    calcCreditsHtml(){
        var credits = [this.data.abstract];
        var innerHTML = "<p>";
        credits.forEach((line,i) =>{
            if (i!=0){innerHTML += "<br>";}
            innerHTML += line;
        })
        innerHTML+= this.getlinksHtml();
        innerHTML+= "</p>";
        return innerHTML;
    }
    parseSlideShowData(){
        this.slidesData = this.data.content_slides.split(',');
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
        var innerHTML = "<p>" + this.data[_exptype] + "</p>";
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

}