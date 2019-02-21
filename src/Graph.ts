import {Node} from "./Node.js";
import {Link} from "./Link.js";

export class Graph {
    private static graphs: Graph[] = [];

    private id: number;
    private date: Date;
    private readonly nodes: Node[] = [];
    private readonly links: Link[] = [];

    constructor(nodes: Node[], links: Link[]) {
        this.nodes = nodes;
        this.links = links;
    }

    private toJSON(): string {
        return JSON.stringify([{info: {'id': this.id, 'date': this.date.toLocaleString('en-US')}}, {nodes: this.nodes}, {links: this.links}], function(key: string, value: any): string {
            return key === '_links' || key === '_element' || key === 'arrow' ? undefined : value;
        });
    }

    save(): void {
        for (let node of this.nodes) {
            node.setCoords();
        }
        let graphId: number = Number(localStorage.getItem('numSavedGraphs'));
        this.id = graphId;
        this.date = new Date();
        localStorage.setItem('graph' + graphId, this.toJSON());
        localStorage.setItem('numSavedGraphs', String(graphId + 1));
        Graph.graphs.push(Graph.getGraph(localStorage.getItem('graph' + graphId)));
        Graph.updateList();
        // @ts-ignore
        new Noty({
            theme: 'relax',
            type: 'success',
            layout: 'topLeft',
            text: 'Graph saved.',
            timeout: 3000,
            killer: true
        }).show();
    }

    load(): void {
        while (Node.nodes.length > 0) {
            Node.nodes[0].delete(false);
        }
        for (let node of this.nodes) {
            node.create(false);
        }
        for (let link of this.links) {
            link.create();
            link.node1.links.push(link);
            link.node2.links.push(link);
        }
        // @ts-ignore
        new Noty({
            theme: 'relax',
            type: 'info',
            layout: 'topLeft',
            text: 'Graph loaded.',
            timeout: 3000,
            killer: true
        }).show();
    }

    static getSavedGraphs(): void {
        for (let i: number = 0; i < Number(localStorage.getItem('numSavedGraphs')); i++) {
            let graph: Graph = Graph.getGraph(localStorage.getItem('graph' + i));
            Graph.graphs.push(graph);
        }
        Graph.updateList();
    }

    private static getGraph(jsonValue: string): Graph {
        let json: any[] = JSON.parse(jsonValue);
        let nodes: Node[] = [];
        let links: Link[] = [];
        for (let nodeField of json[1].nodes) {
            nodes.push(new Node(nodeField.value, nodeField.size, nodeField.color, nodeField._coords));
        }
        for (let linkField of json[2].links) {
            let node1: Node, node2: Node;
            for (let node of nodes) {
                if (JSON.stringify(new Node(linkField.node1.value, linkField.node1.size, linkField.node1.color, linkField.node1._coords)) == JSON.stringify(node)) {
                    node1 = node;
                } else if (JSON.stringify(new Node(linkField.node2.value, linkField.node2.size, linkField.node2.color, linkField.node2._coords)) == JSON.stringify(node)) {
                    node2 = node;
                }
            }
            links.push(new Link(node1, node2, linkField.distance));
        }
        let graph: Graph = new Graph(nodes, links);
        graph.id = json[0].info.id;
        graph.date = json[0].info.date;
        return graph;
    }

    private static updateList(): void {
        let graphList: HTMLElement = document.getElementById('graphList');
        graphList.innerHTML = '';
        for (let graph of Graph.graphs) {
            let graphListElement: HTMLElement = document.createElement('li');
            graphListElement.innerText = 'Saved graph ' + graph.id + ' (Saved on: ' + graph.date.toLocaleString('en-US') + ') ';
            let loadGraphButton: HTMLElement = document.createElement('button');
            loadGraphButton.innerText = 'Load';
            loadGraphButton.onclick = function(): void {
                graph.load();
            };
            graphListElement.appendChild(loadGraphButton);
            graphList.appendChild(graphListElement);
        }
    }
}