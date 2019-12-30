/*
 * home page  
 */

initCatalog();

function initCatalog(){   
    var siteframe = {};

    queue()
        .defer(d3.csv, "data/catalog.csv")
        .await(createProjectCatalog)
        
        
    function createProjectCatalog(error, catalogData){
        siteframe = new Siteframe(catalogData,"catalog");
        siteframe.createContentOfCatalog();
    }

}
