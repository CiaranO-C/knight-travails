function Board() {
  const boardWidth = 8;
  const boardSize = boardWidth * boardWidth;
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
      console.log(`Knight on ${vertex.square} can move to:`);
      console.table(children);
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
  }

  function breadthFirstSearch(vertex) {
    
    breadthRecursive();
   

    function breadthRecursive(queue = [vertex]) {
      if (queue.length === 0) return null;
      const node = queue.shift();
      node.visited = true;
      console.log(node.square);
      
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        if (child.visited === false){
             queue.push(child);
             child.visited = true;
        }
      }
      breadthRecursive(queue);
    }
  }
  return { buildGraph, list, breadthFirstSearch };
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

let chess = Board();
chess.buildGraph();
chess.breadthFirstSearch(chess.list[0]);
