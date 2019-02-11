import { Node } from './Node.js';
export class AdjacencyMatrix {
    constructor(v, e) {
        this.matrix = [];
        this.vertices = [];
        this.edges = [];
        this.vertices = v;
        this.edges = e;
        this.matrix = new Array(this.vertices.length).fill(0).map(() => new Array(this.vertices.length).fill(0));
        this.create();
    }
    create() {
        for (let link of this.edges) {
            let i = this.vertices.indexOf(link.node1);
            let j = this.vertices.indexOf(link.node2);
            this.matrix[i][j] = link.distance;
            this.matrix[j][i] = link.distance;
        }
    }
    dijkstraAlgorithm(origin) {
        if (Node.nodes[origin].links.length === 0) {
            throw new Error('Origin node is not connected');
        }
        let optimized = new Array(this.vertices.length).fill(false);
        let distances = new Array(this.vertices.length).fill(Number.POSITIVE_INFINITY);
        let predecessors = new Array(this.vertices.length);
        distances[origin] = 0;
        while (optimized.filter(function (x) { return !x; }).length != 0) {
            let v;
            let min = Number.POSITIVE_INFINITY;
            let i = 0;
            for (let dist of distances) {
                if (dist < min && !optimized[i]) {
                    v = i;
                    min = dist;
                }
                i++;
            }
            optimized[v] = true;
            for (let j = 0; j < this.matrix[v].length; j++) {
                if (this.matrix[v][j] !== 0 && v !== j) {
                    if (distances[v] + this.matrix[v][j] < distances[j]) {
                        distances[j] = distances[v] + this.matrix[v][j];
                        predecessors[j] = v;
                    }
                }
            }
        }
        return [predecessors, distances];
    }
    toString() {
        let result = '';
        for (let i = 0; i < this.vertices.length; i++) {
            for (let j = 0; j < this.vertices.length; j++) {
                result += this.matrix[i][j] + ' ';
            }
            result += '\n';
        }
        return result;
    }
}
//# sourceMappingURL=AdjacencyMatrix.js.map