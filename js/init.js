function initAbout(_path="", _briefName = "About"){
    var siteframe = {};
    
    queue()
    .defer(d3.csv, _path + "data/catalog.csv")
    .defer(d3.csv, _path + "data/brief.csv" )
    .await(createAbout)

    function createAbout(error, catalogData, briefData){
        var data = catalogData;
        data.forEach(function(d){
            d.id = +d.id;
        })
        siteframe = new Siteframe(data,briefData,"single_project",_path);
        siteframe.createContentOfSingleBrief(_briefName);
    }
}





function initProject(_path="", _projectName="Xenolith"){   
    var siteframe = {};

    queue()
        .defer(d3.csv, _path + "data/catalog.csv")
        .defer(d3.csv, _path + "data/brief.csv" )
        .await(createProjectDisplay)
        
        
    function createProjectDisplay(error, catalogData, briefData){
        var data = catalogData;
        data.forEach(function(d){
            d.id = +d.id;
        })
        siteframe = new Siteframe(data,briefData,"single_project",_path);
        siteframe.createContentOfSingleProject(_projectName);
    }
}


function initCatalog(_path=""){   
    var siteframe = {};

    queue()
        .defer(d3.csv, _path + "data/catalog.csv")
        .defer(d3.csv, _path +"data/brief.csv" )
        .await(createProjectCatalog)
        
        
    function createProjectCatalog(error, catalogData, briefData){
        var data = catalogData;
        data.forEach(function(d){
            d.id = +d.id;
        })
        siteframe = new Siteframe(data,briefData,"catalog",_path);
        siteframe.createContentOfCatalog();
    }
}