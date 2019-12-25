/*
 * Project - The wrapper class for project in catalog
 * @param _parentElement 	-- the HTML element in which to render project image, title and description
 * @param _data						-- the object that contains image name, title, description
 */

class Project{

    parentEleId;
    data;
    parentElement;

    constructor(_parentEleId,_data)
    {
        this.parentEleId = _parentEleId;
        this.data = _data;
        this.parentElement = document.getElementById(this.parentEleId);
        this.initProject();
    }


    initProject(){
        var project_wrapper = document.createElement("div");
        project_wrapper.setAttribute("class","project-wrapper mb-5");
        project_wrapper.setAttribute("data-aos", "fade-in");
        
        var cover_img = document.createElement("img");
        cover_img.setAttribute("src", "static/"+ this.data.cover_img);
        cover_img.setAttribute("alt",this.data.cover_img);
        cover_img.setAttribute("class", "img-fluid project-cover");

        var title = document.createElement("div");
        title.setAttribute("class","my-5 project-title");
        var title_text = document.createElement("h5");
        var title_link = document.createElement("a");
        title_link.innerHTML = this.data.title.toUpperCase();
        title_link.setAttribute("href",this.data.title.toLowerCase()+".html");
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

        this.parentElement.appendChild(project_wrapper);
    }

    addProjectLinkOnMenu(_ulNodeId, _totalNum){
        var project_link = document.createElement("li");
        project_link.style.height = "calc(100% / " + _totalNum + ")";
        var project_link_a = document.createElement("a");
        project_link_a.innerHTML = this.data.title;
        project_link_a.setAttribute("href",this.data.title.toLowerCase()+".html")
        project_link.appendChild(project_link_a);
        var ulNode = document.getElementById(_ulNodeId);
        ulNode.appendChild(project_link);
    }

}