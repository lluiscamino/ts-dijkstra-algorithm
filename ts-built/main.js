import { Node } from './Node.js';
import { Link } from './Link.js';
import { AdjacencyMatrix } from './AdjacencyMatrix.js';
import { Graph } from "./Graph.js";
/* Create default initial node */
let initialNode = new Node('Node 1', 120, 'green');
initialNode.create(false);
/* Loads saved graphs */
Graph.getSavedGraphs();
document.getElementById('createNodeForm').addEventListener('submit', function (event) {
    event.preventDefault();
    let value = document.getElementById('nodeValue').value;
    let size = parseInt(document.getElementById('size').value);
    let color = document.getElementById('color').value;
    let node = new Node(value, size, color);
    node.create();
    document.getElementById('nodeValue').value = '';
});
document.getElementById('shortestPathForm').addEventListener('submit', function (event) {
    event.preventDefault();
    Link.unHighlightAll();
    try {
        let adjMatrix = new AdjacencyMatrix(Node.nodes, Link.links);
        let origin = parseInt(document.getElementById('originSelect').value);
        let destiny = parseInt(document.getElementById('destinySelect').value);
        let dijkstra = adjMatrix.dijkstraAlgorithm(origin);
        let predecessors = dijkstra[0];
        let distance = dijkstra[1][destiny];
        if (distance === Number.POSITIVE_INFINITY) {
            throw new Error('Unable to find path between nodes');
        }
        let actualNode = destiny;
        let path = [];
        while (actualNode !== undefined) {
            path.unshift(actualNode);
            if (predecessors[actualNode] !== undefined) {
                let actualLink = Link.getLinkByNodes(Node.nodes[actualNode], Node.nodes[predecessors[actualNode]]);
                actualLink.highlight();
            }
            actualNode = predecessors[actualNode];
        }
        let shortestPathResult = document.getElementById('shortestPathResult');
        for (let i = 0; i < path.length; i++) {
            shortestPathResult.innerHTML += i !== path.length - 1 ? Node.nodes[path[i]].value + ' → ' : Node.nodes[path[i]].value;
        }
        shortestPathResult.innerHTML += ' (' + distance + ')<br>';
    }
    catch (e) {
        // @ts-ignore
        new Noty({
            theme: 'relax',
            type: 'error',
            layout: 'topLeft',
            text: e.message,
            timeout: 3000,
            killer: true
        }).show();
    }
});
document.getElementById('saveGraphButton').addEventListener('click', function () {
    let graph = new Graph(Node.nodes, Link.links);
    graph.save();
});
//# sourceMappingURL=main.js.map