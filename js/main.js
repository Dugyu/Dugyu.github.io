$('#toggle').click(function() {
    $(this).toggleClass('active');
    $('#overlay').toggleClass('open');
   });


projectList = [];

queue()
    .defer(d3.csv, "data/catalog.csv")
    .await(createProjectCatalog)

function createProjectCatalog(error, catalogData){
    catalogData.forEach(e => {
    var project = new Project("catalog",e);
    projectList.push(project);
   });
}

