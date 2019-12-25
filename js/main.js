projectList = [];

queue()
    .defer(d3.csv, "data/catalog.csv")
    .await(createProjectCatalog)

function createProjectCatalog(error, catalogData){
    catalogData.forEach(e => {
    var project = new Project("catalog",e);
    project.addProjectLinkOnMenu('project-menu',catalogData.length + 2)
    projectList.push(project);
   });
}

