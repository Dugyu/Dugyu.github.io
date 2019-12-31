/*
 * about page  
 */



initCatalog("../");

function initCatalog(_path=""){   
    var siteframe = {};

    queue()
        .defer(d3.csv, _path + "data/catalog.csv")
        .defer(d3.csv, _path + "data/brief.csv" )
        .await(createProjectCatalog)
        
        
    function createProjectCatalog(error, catalogData, briefData){
        siteframe = new Siteframe(catalogData,briefData,"single_project", _path);
        console.log(_path)
        //siteframe.createContentOfCatalog();
    }

}