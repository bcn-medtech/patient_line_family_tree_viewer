import {
    filter
} from 'underscore';
import { isObjectEmpty } from './../../../../modules/rkt_module_object';
//Using global variables

const d3 = window.d3;
var svg;

export default class TreeDisplayer {


    create(el, props, root, sib, patient_id, set_patient) {

        var w = props.width;
        var h = props.height;

        // Setup zoom and pan
        var zoom = d3.behavior.zoom()
            .scaleExtent([.1, 1])
            .on('zoom', function () {
                //console.log(d3.event.scale);
                svg.attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
            })
            // Offset so that first pan and zoom does not jump back to the origin
            .translate([-30, -300]);

        //canvas
        svg = d3.select(el).append('svg')
            .attr('class', 'd3')
            .attr("width", w)
            .attr("height", h)
            .call(zoom)
            .append('g')
            .attr("transform", "translate(-30, -300)");

        this._drawTree(root, sib, patient_id, set_patient);
        
    }

    update(el, state) {

    }

    destroy() {

        d3.select("svg").remove();

    }

    restart_tree_canvas() {

        svg.selectAll(".link").remove();
        svg.selectAll("rect").remove();
        svg.selectAll("text").remove();
        svg.selectAll("circle").remove();
        svg.selectAll(".sibling").remove();
        svg.selectAll("g").remove();
    }

    _drawTree(root, sib, patient_id, set_patient) {

        this.restart_tree_canvas();

        var allNodes = flatten(root);
        var width = 1000
        var height = 800;
        //This maps the siblings together mapping uses the ID using the blue line
        var siblings = sib;

        // Compute the layout.
        var tree = d3.layout.tree()
            .size([width, height]).separation(function () {
                return 0.1;
            }),
            nodes = tree.nodes(root),
            links = tree.links(nodes);

        var nodes = filter(nodes, function (item) {

            if (typeof item !== "string") {
                return true;
            } else {
                return false;
            }

        });

        var links = filter(links, function (link) {

            if (typeof link.target !== "string") {
                return true;
            } else {
                return false;
            }

        });

        // Create the link lines.
        svg.selectAll(".link")
            .data(links)
            .enter().append("path")
            .attr("class", "link")
            .attr("d", elbow);

        //First draw sibling line with blue line
        svg.selectAll(".sibling")
            .data(siblings)
            .enter().append("path")
            .attr("class", "sibling")
            .attr("d", sblingLine);

        // Nodes
        var node_containers = svg.selectAll(".node")
            .data(nodes.filter(function (d) {
                return !d.hidden;
            }))
            .enter()
            .append("g")
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")"
            })
            .attr("id", function (d) { return d.id; })
            
        // add the svg status of the nodes --> status = phenotype (shape, color and/or line) + genotype (symbol)
        // phenotype
        var node_phenotypes = node_containers.append("use")
            .attr("xlink:href", function(d) { return "#tree-" + d.phenotype + "-shape-" + d.gender })

        // genotype
        var node_genotypes = node_containers.append("use")
            .attr("xlink:href", function(d) { return "#tree-" + d.genotype + "-symbol" })
        
        // and add a border to the node that reacts when hovering/selecting the nodes
        var node_borders = node_containers.each(function(d) {

            var node = d3.select(this);

            // male: rect
            if (d.gender === "male") {

                node.append("rect")
                    .attr("width", "40")
                    .attr("height", "40")
                    .attr("x", -20)
                    .attr("y", -20)
                    .attr("class", function (d) {
                        if (d.id === patient_id) return "node-border selected";
                        else return "node-border";
                    })
                    .on('click', function (d) { set_patient(d.id); })

            // female: circle
            } else if (d.gender === "female") {

                node.append("circle")
                    .attr("r", "20")
                    .attr("class", function (d) {
                        if (d.id === patient_id) return "node-border selected";
                        else return "node-border";
                    })
                    .on('click', function (d) { set_patient(d.id); })

            // undefined gender: diamond
            } else if (d.gender === "") {

                node.append("rect")
                    .attr("width", "40")
                    .attr("height", "40")
                    .attr("x", -28)
                    .attr("transform", "rotate(45, 20, 20)")
                    .attr("class", function (d) {
                        if (d.id === patient_id) return "node-border selected";
                        else return "node-border";
                    })
                    .on('click', function (d) { set_patient(d.id); })

            }

        })

        // Text labels of the nodes
        var nodes_text = node_containers.append("text")
            .attr("class", "text")
            .attr("dy", "0em")
            .attr("x", -20)
            .attr("y", 50)
            .html(function (d) {
                var data_to_display = ["nhc", "dob", "symptoms"];
                var text_labels = print_text_labels(d, data_to_display);
                return text_labels;
            });

        
        function print_text_labels(d, items) {

            var name = d.name;
            var text_labels = name;
            
            var x = -20;
            var y = 80;
            
            for (var i=0; i<items.length; i++) {
                
                var item = items[i];
                
                if (!isObjectEmpty(d[item])) {
                    text_labels = text_labels + "<tspan x=" + x + " y=" + y + ">" + d[item] + "</tspan>";
                    y = y+30//25;
                }
                
            }

            return text_labels;

        }
        /**
        This defines the line between siblings.
        **/
        function sblingLine(d, i) {

            //start point
            var start = allNodes.filter(function (v) {

                if (d.source.id === v.id) {
                    return true;
                } else {
                    return false;
                }
            });

            //end point
            var end = allNodes.filter(function (v) {
                if (d.target.id === v.id) {
                    return true;
                } else {
                    return false;
                }
            });
            //define teh start coordinate and end co-ordinate
            var linedata = [{
                x: start[0].x,
                y: start[0].y
            }, {
                x: end[0].x,
                y: end[0].y
            }];
            var fun = d3.svg.line().x(function (d) {
                return d.x;
            }).y(function (d) {
                return d.y;
            }).interpolate("linear");
            return fun(linedata);
        }

        /*To make the nodes in flat mode.
        This gets all teh nodes in same level*/
        function flatten(root) {
            var n = [],
                i = 0;

            function recurse(node) {

                if (typeof node !== "string") {
                    if (node.children) node.children.forEach(recurse);
                    if (!node.id) node.id = ++i;
                    n.push(node);
                }

            }
            recurse(root);
            return n;
        }

        /**
        This draws the lines between nodes.
        **/
        function elbow(d, i) { 
            if (d.target.no_parent) {
                return "M0,0L0,0";
            }
            var diff = d.source.y - d.target.y;
            //0.40 defines the point from where you need the line to break out change is as per your choice.
            var ny = d.target.y + diff * 0.3;

            var linedata = [{
                x: d.target.x,
                y: d.target.y
            }, {
                x: d.target.x,
                y: ny
            }, {
                x: d.source.x,
                y: d.source.y
            }]
            
            var fun = d3.svg.line().x(function (d) {
                return d.x;
            }).y(function (d) {
                return d.y;
            }).interpolate("step-after");
            return fun(linedata);
        }
    }
}