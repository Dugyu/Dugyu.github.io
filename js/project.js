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
        title_text.innerHTML = this.data.title.toUpperCase();
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


}