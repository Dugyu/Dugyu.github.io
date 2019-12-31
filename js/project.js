/*
 * Project - The wrapper class for project in catalog
 * @param _data						-- the object that contains image name, title, description
 * @param _path                        -- string, the relative path to index.html, default to ""

 */

class Project{

    data;
    path;
    projectPath;

    constructor(_data, _path="")
    {
        this.data = _data;
        this.path = _path;
        this.initProjectPath();
    }


    addProjectToCatalog(_parentEleId){
        var parentElement = document.getElementById(_parentEleId);

        var project_wrapper = document.createElement("div");
        project_wrapper.setAttribute("class","project-wrapper mb-5");
        project_wrapper.setAttribute("data-aos", "fade-in");
        
        var cover_img = document.createElement("img");
        cover_img.setAttribute("src", this.projectPath + "static/"+ this.data.cover_img);
        cover_img.setAttribute("alt",this.data.cover_img);
        cover_img.setAttribute("class", "img-fluid project-cover");

        var title = document.createElement("div");
        title.setAttribute("class","my-5 project-title");
        var title_text = document.createElement("h5");
        var title_link = document.createElement("a");
        title_link.innerHTML = this.data.title.toUpperCase();
        title_link.setAttribute("href", this.projectPath);
        title_text.appendChild(title_link);
        title.appendChild(title_text);

        var description = document.createElement("div");
        description.setAttribute("class","project-description");
        var description_text = document.createElement("p");
        description_text.innerHTML = this.data.abstract;
        description.appendChild(description_text);

        project_wrapper.appendChild(cover_img);
        project_wrapper.appendChild(title);
        project_wrapper.appendChild(description);

        parentElement.appendChild(project_wrapper);
    }

    addProjectLinkOnMenu(_ulNodeId, _totalNum){
        var project_link = document.createElement("li");
        project_link.style.height = "calc(100% / " + _totalNum + ")";
        var project_link_a = document.createElement("a");
        project_link_a.innerHTML = this.data.title;
        project_link_a.setAttribute("href",this.projectPath)
        project_link.appendChild(project_link_a);
        var ulNode = document.getElementById(_ulNodeId);
        ulNode.appendChild(project_link);
    }

    initProjectPath(){
        this.projectPath = this.path + "projects/" + this.data.title.toLowerCase() + "/";
    }

}