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
        var data = catalogData;
        data.forEach(function(d){
            d.id = +d.id;
        })
        siteframe = new Siteframe(data,briefData,"catalog");
        siteframe.createContentOfCatalog();
    }

}
