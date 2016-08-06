function draw(dataset){
    $('#my-svg').empty();
    var drawGem = function(dataset) {
            //Width and height and radius
            var w = 800;
            var h = 600;
            var rad = 10;
            //alert(dataset);
            var dataset = {
            nodes: [
                { name: "Adam" , id: ""},
                { name: "Bob" , id: ""},
                { name: "Carrie" , id: ""},
                { name: "Donovan" , id: ""},
                { name: "Edward" , id: ""},
                { name: "Felicity" , id: ""},
                { name: "George" , id: ""},
                { name: "Hannah" , id: ""},
                { name: "Iris" , id: ""},
                { name: "Jerry", id: "" }
            ],
            edges: [
                { source: 0, target: 1 , relation: "a"},
                { source: 0, target: 2 , relation: "b"},
                { source: 0, target: 3 , relation: "c"},
                { source: 0, target: 4 , relation: "d"},
                { source: 1, target: 5 , relation: "e"},
                { source: 2, target: 5 , relation: "f"},
                { source: 2, target: 5 , relation: "g"},
                { source: 3, target: 4 , relation: "h"},
                { source: 5, target: 8 , relation: "i"},
                { source: 5, target: 9 , relation: "g"},
                { source: 6, target: 7 , relation: "k"},
                { source: 7, target: 8 , relation: "l"},
                { source: 8, target: 9 , relation: "m"}
            ]
        };
        //
            //Initialize a default force layout, using the nodes and edges in   dataset
            var force = d3.layout.force()
                                .nodes(dataset.nodes)
                                .links(dataset.edges)
                                .size([w, h])
                                .linkDistance([150])
                                .charge([-300])
                                .start();

            var colors = d3.scale.category10();

            //Create SVG element
            var svg = d3.select("#my-svg")
                        .append("svg")
                        .attr("width", w)
                        .attr("height", h);

            //Create edges as lines
            var edges = svg.selectAll("line")
                .data(dataset.edges)
                .enter()
                .append("line")
                .style("stroke", "#ccc")
                .style("stroke-width", 1);

            var edges_text = svg.selectAll(".linetext")
                                .data(dataset.edges)
                                .enter()
                                .append("text")
                                .attr("class","linetext")
                                .text(function(d){
                                    return d.relation;
                                });

            //Create labels
            var text_dx = -20;
            var text_dy = 20;
            var drag = force.drag()
                            .on("dragstart",function(d,i){
                                d.fixed = true;
                            })
            var nodes_text = svg.selectAll(".nodetext")
                                .data(dataset.nodes)
                                .enter()
                                .append("text")
                                .attr("class","nodetext")
                                .attr("dx",text_dx)
                                .attr("dy",text_dy)
                                .text(function(d){
                                    return d.name;
                                });
            //Create nodes as circles
            var nodes = svg.selectAll("circle")
                .data(dataset.nodes)
                .enter()
                .append("circle")
                .attr("r", rad)
                .style("fill", function(d, i) {
                    return colors(i);
                })
                .on("mouseover",function(d,i){
                    edges_text.style("fill-opacity",function(edge){
                        if( edge.source === d || edge.target === d ){
                            return 1.0;
                        }
                    });
                })
                .on("mouseout",function(d,i){
                    edges_text.style("fill-opacity",function(edge){
                    if( edge.source === d || edge.target === d ){
                        return 0.0;
                        }
                    });
                })
                .on("click", function(d, i){
                    $('div#message-area ul#message').addClass('hide');
                    $('div#message-area ul#gene-message').removeClass('hide');
                    getGeneMessage(d.id);
                })
                .on("dblclick",function(d,i){
                    d.fixed = false;
                })
                .call(force.drag);
            //Every time the simulation "ticks", this will be called
            force.on("tick", function() {
                dataset.nodes.forEach(function(d,i){
                    d.x = d.x - rad < 0     ? rad : d.x ;
                    d.x = d.x + rad > w ? w - rad : d.x ;
                    d.y = d.y - rad < 0      ? rad : d.y ;
                    d.y = d.y + rad + text_dy > h ? h - rad - text_dy : d.y ;
                });
                edges.attr("x1", function(d) { return d.source.x; })
                    .attr("y1", function(d) { return d.source.y; })
                    .attr("x2", function(d) { return d.target.x; })
                    .attr("y2", function(d) { return d.target.y; });
                nodes.attr("cx", function(d) { return d.x; })
                    .attr("cy", function(d) { return d.y; });
                nodes_text.attr("x",function(d){ return d.x });
                nodes_text.attr("y",function(d){ return d.y + 10});
            edges_text.attr("x",function(d){ return (d.source.x + d.target. x) / 2 ; });
            edges_text.attr("y",function(d){ return (d.source.y + d.target. y) / 2 ; });
            });
        }
        drawGem(dataset);
        //test
        /*
            d3.json("test.json", function(error, dataset){
                //if (error) return console.warn(error);
                //alert("heel");
                drawGem(dataset);
            });
*/
        //function getSearchResult(input){
        //   $.ajax({
        //      url:'' + input,
        //      type:'GET',
        //      success:function(result){
        //          insertSearchResult(result);
        //      }
        //   });
        //}
}