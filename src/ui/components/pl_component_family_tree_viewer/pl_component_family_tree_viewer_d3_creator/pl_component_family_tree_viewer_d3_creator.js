import './pl_component_family_tree_viewer_d3_creator.css';
import './pl_component_family_tree_viewer_d3_context_menu';

import {
    filter
} from 'underscore';
//Using global variables
const d3 = window.d3;
console.log(d3);

export default class TreeDisplayer {

    create(el, props, root, sib, addDaughter, addSon, addWife, addHusband, addSister, addBrother, deleteMember, onClick, changeStatus) {
        
       
        var w = props.width;
        var h = props.height;

        //var w = 600;
        //var h = 600;
        // Setup zoom and pan
        var zoom = d3.behavior.zoom()
            .scaleExtent([.1, 1])
            .on('zoom', function () {
                svg.attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
            })
            // Offset so that first pan and zoom does not jump back to the origin
            .translate([-30, -300]);

        //canvas
        var svg = d3.select(el).append('svg')
            .attr('class', 'd3')
            .attr("width", w)
            .attr("height", h)
            //.attr("class", "overlay")
            .call(zoom)
            .append('g')
            //.attr('class', 'd3-points')
            .attr("transform", "translate(-30, -300)");

        // context menu

        /*var menu = [
            {
                title: 'Add member  ...',
                // Exceute Action
                onMouseClick: function (elm, d, i) {

                },
                onMouseOver: function (elm, d, i) {

                },
                chidernItems: [
                    {
                        title: 'Daughter',
                        // Exceute Action
                        onMouseClick: addDaughter,
                        onMouseOver: function (elm, d, i) {

                        }
                    },
                    {
                        title: 'Son ',
                        // Exceute Action
                        onMouseClick: addSon,
                        onMouseOver: function (elm, d, i) {

                        }
                    },
                    {
                        title: 'Wife ',
                        // Exceute Action
                        onMouseClick: addWife,
                        onMouseOver: function (elm, d, i) {

                        }
                    },
                    {
                        title: 'Husband ',
                        // Exceute Action
                        onMouseClick: addHusband,
                        onMouseOver: function (elm, d, i) {

                        }
                    },
                    {
                        title: 'Sister ',
                        // Exceute Action
                        onMouseClick: addSister,
                        onMouseOver: function (elm, d, i) {

                        }
                    },
                    {
                        title: 'Brother ',
                        // Exceute Action
                        onMouseClick: addBrother,
                        onMouseOver: function (elm, d, i) {
                        }
                    }

                ]
            },
            {
                title: 'Change diagnostic ...',
                onMouseClick: function (elm, d, i) {

                },
                onMouseOver: function (elm, d, i) {
                },
                chidernItems: [
                    {
                        title: 'Pending Diagnose ',
                        // Exceute Action
                        onMouseClick: addBrother,
                        onMouseOver: function (elm, d, i) {
                        }
                    },
                    {
                        title: 'Diagnosed',
                        // Exceute Action
                        onMouseClick: addBrother,
                        onMouseOver: function (elm, d, i) {
                        }
                    }
                ]
            },
            {
                title: 'Change status ...',
                onMouseClick: function (elm, d, i) {

                },
                onMouseOver: function (elm, d, i) {
                },
                chidernItems: [
                    {
                        title: 'Portadora ',
                        // Exceute Action
                        onMouseClick: changeStatus,
                        onMouseOver: function (elm, d, i) {
                        }
                    },
                    {
                        title: 'Sudden Death',
                        // Exceute Action
                        onMouseClick: changeStatus,
                        onMouseOver: function (elm, d, i) {
                        }
                    },
                    {
                        title: 'Death',
                        // Exceute Action
                        onMouseClick: changeStatus,
                        onMouseOver: function (elm, d, i) {
                        }
                    },
                    {
                        title: 'Portador Obligado',
                        // Exceute Action
                        onMouseClick: changeStatus,
                        onMouseOver: function (elm, d, i) {
                        }
                    }
                ]
            },
            {
                title: 'Delete',
                onMouseClick: deleteMember,
                onMouseOver: function (elm, d, i) {
                },
                chidernItems: [
                ]
            }
        ];*/

        var menu = [
            {
                title: 'Header',
            },
            {
                title: 'Normal item',
                action: function() {}
            },
            {
                divider: true
            },
            {
                title: 'Last item',
                action: function() {}
            }
        ];

        this._drawTree(svg, root, sib, menu, onClick);

    }

    update(el, state) {
        // Re-compute the scales, and render the data points
        /*var scales = this._scales(el, state.domain);
        this._drawPoints(el, scales, state.data);*/
    }

    destroy() {
        d3.select("svg").remove();

        // Any clean-up would go here
        // in this example there is nothing to do
    }

    _drawTree(svg, root, sib, menu, onClick) {

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


        // Create the link lines.
        svg.selectAll(".link")
            .data(links)
            .enter().append("path")
            .attr("class", "link")
            .attr("d", elbow);


        var nodes = svg.selectAll(".node")
            .data(nodes)
            .enter();

        //First draw sibling line with blue line
        svg.selectAll(".sibling")
            .data(siblings)
            .enter().append("path")
            .attr("class", "sibling")
            .attr("d", sblingLine);

        // Create the node rectangles for males.
        nodes.append("rect")
            .filter(function (d) { 
                //console.log(d);
                return d.gender === "male"; 
            })
            .attr("class", function (d) { return d.status; })
            .attr("height", 40)
            .attr("width", 40)
            .attr("id", function (d) {
                return d.id;
            })
            .attr("display", function (d) {
                if (d.hidden) {
                    return "none";
                } else {
                    return "";
                }
            })
            .attr("x", function (d) { return d.x - 20; })
            .attr("y", function (d) { return d.y - 20; })
            .on('contextmenu', d3.contextMenu(menu))
            //.on('click', onClick);
        
        nodes.append("text").filter(function (d) { return d.gender === "male"; })
            .text(function (d) {
                var info;
                info = d.name;
                return info;
            })
            .attr("class","text")
            .attr("dy", "0em")
            .attr("x", function (d) { return d.x - 20; })
            .attr("y", function (d) { return d.y + 40; });

        nodes.append("text").filter(function (d) { return d.gender === "male"; })
            .text(function (d) {
                var info;
                info = d.nhc;
                return info;
            })
            .attr("class","text")
            .attr("dy", "1em")
            .attr("x", function (d) { return d.x - 20; })
            .attr("y", function (d) { return d.y + 40; });

        // Create the node circles for females.
        nodes.append("circle").filter(function (d) { return d.gender === "female"; })
            .attr("class", function (d) { return d.status; })
            .attr("r", 20)
            .attr("id", function (d) {
                return d.id;
            })
            .attr("display", function (d) {
                if (d.hidden) {
                    return "none"
                } else {
                    return ""
                };
            })
            .attr("cx", function (d) { return d.x - 4; })
            .attr("cy", function (d) { return d.y - 4; })
            .on('contextmenu', d3.contextMenu(menu))
            //.on('click', onClick);
        //.on('mouseout', tip.hide);

        // Create the node text label.
        nodes.append("text").filter(function (d) { return d.gender === "female"; })
            .text(function (d) {
                var info;
                info = d.name + "  \n";
                return info;
            })
            .attr("class","text")
            .attr("dy", "0em")
            .attr("x", function (d) { return d.x - 20; })
            .attr("y", function (d) { return d.y + 40; });
        
        nodes.append("text").filter(function (d) { return d.gender === "female"; })
            .text(function (d) {
                var info;
                info = d.nhc;
                return info;
            })
            .attr("class","text")
            .attr("dy", "1em")
            .attr("x", function (d) { return d.x - 20; })
            .attr("y", function (d) { return d.y + 40; });
        //.on('mouseout', tip.hide);*/


        /**
        This defines teh line between siblings.
        **/
        function sblingLine(d, i) {

            //console.log(allNodes);
            //start point
            var start = allNodes.filter(function (v) {

                //console.log(d.source.id);
                //console.log(v.id);

                if (d.source.id == v.id) {
                    return true;
                } else {
                    return false;
                }
            });

            //end point
            var end = allNodes.filter(function (v) {
                if (d.target.id == v.id) {
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

            //console.log("****** flatten ******");
            function recurse(node) {

                if (typeof node !== "string") {
                    //console.log(node);
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
