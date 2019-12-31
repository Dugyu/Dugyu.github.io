/*
 * Brief - The wrapper class for introductory page content
 * @param _data						-- the object that contains image name, title, description
 * @param _path                        -- string, the relative path to index.html, default to ""
 */

class Brief{
    data;
    path;
    dataPath;

    constructor(_data, _path="", _dataPath="")
    {
        this.data = _data;
        this.path = _path;
        this.dataPath = _dataPath;
    }

    addLinkOnMenu(_ulNodeId, _totalNum){
        var link = document.createElement("li");
        link.style.height = "calc(100% / " + _totalNum + ")";
        var link_a = document.createElement("a");
        link_a.innerHTML = this.data.title;
        link_a.setAttribute("class","menu_link");
        link_a.setAttribute("href",this.dataPath);
        link.appendChild(link_a);
        var ulNode = document.getElementById(_ulNodeId);
        ulNode.appendChild(link);
    }
}