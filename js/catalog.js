/*
 * Catalog - The wrapper class for catalog on home page
 * @param _wrapperList          -- an array that contains the wrappers(project\brief) to display
 * @param _containerId      -- the id of parent responsive container
 * @param _wrapperClass     -- a string indicates which type of content the catalog contains
 */


class Catalog{
    constructor(_wrapperList, _containerId, _wrapperClass="project-wrapper")
    {
        this.originalData = _wrapperList;
        this.displayData = _wrapperList.slice();
        this.containerId = _containerId;
        this.wrapperClass = _wrapperClass;
        this.initCatalog();
        this.updateCatalog();
        //this.onclick();
    }

    onclick(){
        var vis = this;
        d3.select("#sitename-logo").on("click", function(d){
            vis.resortCatalog();
        });
        d3.select("#sitename-char-logo").on("click", function(d){
            vis.resortCatalog2();
        });
        
    }
    initCatalog(){
        var vis = this;
        vis.catalog = d3.select('#'+vis.containerId);
    }

    updateCatalog(){
        var vis = this;       
        vis.wrapperBind = vis.catalog.selectAll("."+vis.wrapperClass)
                       .data(vis.displayData,function(d){return d.data.id.toString()})
        vis.wrapperBind.exit().remove();
        vis.wrapperBind.enter().append('div')
                        .attr('class', vis.wrapperClass)
                        .attr('data-aos','fade-in')
                        .merge(vis.wrapperBind)
                        .style('order',function(d,i){return i})
                        .html(function(d){
                            return d.calcCatalogHtml();
                        })
    }

    resortCatalog(){
        this.displayData = this.originalData.sort((a,b)=> - a.data.id + b.data.id);
        this.updateCatalog();
    }
    resortCatalog2(){
        this.displayData = this.originalData.sort((a,b)=> a.data.id - b.data.id);
        this.updateCatalog();
    }

    filterCatalog(){
        this.displayData = this.originalData.slice(1,);
        this.updateCatalog();
    }
}