function Board() {
  const boardWidth = 8;
  const list = [];
  function buildGraph() {
    for (let i = 0; i < boardWidth; i++) {
      for (let j = 0; j < boardWidth; j++) {
        const vertex = Node([i, j]);
        list.push(vertex);
      }
    }

    list.forEach((vertex) => generateEdges(vertex));

    function generateEdges(vertex) {
      const coords = vertex.square;
      const children = getChildren(coords);
      children.forEach((child) => vertex.children.push(child));
    }

    function getChildren(coords) {
      const children = [];
      let i = coords[0];
      let j = coords[1];
      let m = 2;
      for (let n = 1; n <= 2; n++) {
        const childCoords = [
          [i + n, j - m],
          [i + n, j + m],
          [i - n, j - m],
          [i - n, j + m],
        ];
        m--;
        childCoords.forEach((coord) => {
          const isValid = validateCoords(coord);
          if (isValid) {
            const child = list[getIndex(coord)];
            children.push(child);
          }
        });
      }
      return children;
    }
  }

  function getIndex(coords) {
    //index of vertex === i * boardWidth + j
    const i = coords[0] * boardWidth + coords[1];
    return i;
  }

  function validateCoords(coords) {
    if (coords[0] < 0 || coords[0] > 7 || coords[1] < 0 || coords[1] > 7) {
      return false;
    }
    return true;
  }

  function knightMoves(startCoords, endCoords) {
    const moveValid = validateMove(startCoords, endCoords)
    if(moveValid){
    const startIndex = getIndex(startCoords);
    const endIndex = getIndex(endCoords);

    const start = list[startIndex];
    const end = list[endIndex];

    const path = breadthFirstSearch(start, end);
    return path;
    } 
    return null
  }

  function validateMove(start, end) {
    let isValid = false;
    isValid = validateCoords(start);
    isValid = validateCoords(end);

    if(!isValid) console.error('Enter valid coordinates!');

    return isValid;
  }

  function breadthFirstSearch(start, end) {
    const shortestPath = [];
    breadthRecursive();

    function findPath(node) {
      while (node != null) {
        shortestPath.unshift(node.square);
        node = node.parent;
      }
    }

    function breadthRecursive(queue = [start]) {
      const node = queue.shift();
      node.visited = true;

      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        if (child.visited === false) {
          queue.push(child);
          child.parent = node;
          child.visited = true;
          if (child.square === end.square) {
            const targetNode = child;
            findPath(targetNode);
            return null;
          }
        }
      }
      breadthRecursive(queue);
    }
    return shortestPath;
  }
  return { buildGraph, list, breadthFirstSearch, knightMoves };
}

function Node(coordinates) {
  const square = coordinates;
  let parent = null;
  let visited = false;
  const children = [];
  return {
    square,
    parent,
    visited,
    children,
  };
}

const chess = Board();
chess.buildGraph();
const path = chess.knightMoves([0, 0], [3, 7]);

console.log(path);
