/*
 * home page  
 */

initCatalog();

function initCatalog(){   
    var siteframe = {};

    queue()
        .defer(d3.csv, "data/catalog.csv")
        .defer(d3.csv, "data/brief.csv" )
        .await(createProjectCatalog)
        
        
    function createProjectCatalog(error, catalogData, briefData){
        siteframe = new Siteframe(catalogData,briefData,"catalog");
        siteframe.createContentOfCatalog();
    }

}
