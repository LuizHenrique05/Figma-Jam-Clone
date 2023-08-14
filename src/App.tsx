import ReactFlow, { Background, Connection, ConnectionMode, Controls, addEdge, useEdgesState, useNodesState } from 'reactflow';
import * as Toolbar from '@radix-ui/react-toolbar'
import { zinc } from 'tailwindcss/colors';
import 'reactflow/dist/style.css';
import { Square } from './components/nodes/Square';
import { Stick } from './components/nodes/Stick';
import { useCallback } from 'react';
import DefaultEdge from './components/edges/DefaultEdge';

const NODE_TYPES = {
  square: Square,
  stick: Stick
}

const EDGE_TYPES = {
  default: DefaultEdge,
}

function App() {
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [nodes, setNodes, onNodesChange] = useNodesState([])

  const onConnect = useCallback((connection: Connection) => {
      return setEdges(edges => addEdge(connection, edges))
  }, [])

  function addSquareNode() {
    setNodes(nodes => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: 'square',
        position: {
          x: 750,
          y: 350
        },
        data: {}
      },
    ])
  }

  function addStickNode() {
    setNodes(nodes => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: 'stick',
        position: {
          x: 750,
          y: 350
        },
        data: {}
      },
    ])
  }

  return (
    <div className="w-screen h-screen">
      <ReactFlow
        nodeTypes={NODE_TYPES}
        edgeTypes={EDGE_TYPES}
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        connectionMode={ConnectionMode.Loose}
        defaultEdgeOptions={{
          type: 'default',
        }}
      >
        <Background
          gap={12}
          size={2}
          color={zinc[200]}
        />
        <Controls />
      </ReactFlow>

      <Toolbar.Root className='fixed bottom-20 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg border border-zinc-300 px-8 h-20 w-96 overflow-hidden'>
        <Toolbar.Button
          onClick={addSquareNode} 
          className='w-32 h-32 bg-violet-500 mt-6 rounded transition-transform hover:-translate-y-2' 
        />
        <Toolbar.Button
          onClick={addStickNode} 
          className='w-32 h-32 bg-blue-300 mt-6 rounded transition-transform hover:-translate-y-2 ml-5' 
        />
      </Toolbar.Root>
    </div>
  )
}

export default App
