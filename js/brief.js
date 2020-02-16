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

    calcDetailsBlockHtml(){
        var paragrahs = this.data.content_details.split("<br>");
        var innerHTML = "";
        paragrahs.forEach(p =>{
            innerHTML += "<p>" + p + "</p>";
        })
        return innerHTML;
    }
}