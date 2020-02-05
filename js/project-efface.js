/*
 * Project page  
 */

initProject();

function initProject(){   
    var siteframe = {};

    queue()
        .defer(d3.csv, "../../data/catalog.csv")
        .defer(d3.csv, "../../data/brief.csv" )
        .await(createProjectCatalog)
        
        
    function createProjectCatalog(error, catalogData, briefData){
        var data = catalogData;
        data.forEach(function(d){
            d.id = +d.id;
        })
        siteframe = new Siteframe(data,briefData,"single_project","../../");
        siteframe.createContentOfSingleProject("Efface");

    }

    $(window).on('load',function(){
        console.log('loaded');
    })

}