# TypeScript Dijkstra's algorithm
TypeScript implementation of Dijkstra's algorithm.

> [Dijkstra's algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm) (or Dijkstra's Shortest Path First algorithm, SPF algorithm) is an algorithm for finding the shortest paths between nodes in a graph.
It was conceived by computer scientist Edsger W. Dijkstra in 1956 and published three years later.
>
>![Dijkstra's algorithm gif](https://upload.wikimedia.org/wikipedia/commons/5/57/Dijkstra_Animation.gif)

## How it works
Create nodes by setting a value, a size and a color. Then, link them by clicking on the link button and setting a distance between them.

Finally, you can get the shortest path between two nodes by setting an origin and destiny node in the "Calculate shortest path" section.

## Demo
You can find a demo of the project here: [TypeScript Dijkstra's algorithm demo](https://lluiscamino.github.io/ts-dijkstra-algorithm/)

## Installing

Firstly, install [TypeScript](https://github.com/Microsoft/TypeScript) (via npm):

```bash
npm install -g typescript
```

Then, clone a copy of the repository:

```bash
git clone https://github.com/lluiscamino/ts-dijkstra-algorithm.git
```
Change to the ``ts-dijkstra-algorithm`` folder:
```bash
cd ts-dijkstra-algorithm
```

Install dependencies:

```bash
npm install
```

And finally, compile the code:
```bash
tsc -w
```

## Built with
* [anseki/Leader-line](https://github.com/anseki/leader-line)
* [Drag and drop example by kirupa.com](https://www.kirupa.com/html5/drag.htm)

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/lluiscamino/ts-dijkstra-algorithm/blob/master/LICENSE) file for details.
