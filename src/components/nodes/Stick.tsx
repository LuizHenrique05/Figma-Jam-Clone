import { useState } from "react";
import { Handle, NodeProps, NodeResizer, Position } from "reactflow";

export function Stick({ selected, data }: NodeProps) {
    const [nodeHeight, setNodeHeight] = useState(100)
    
    function handleKeyDown(e: any) {
        //element parent
        parent = e.target.parentNode.parentNode
    
        // Get the computed styles for the element
        const computed = window.getComputedStyle(e.target)

        // Calculate the height
        let height = e.target.scrollHeight

        if([46, 8].includes(e.keyCode)) {
            height = e.target.scrollHeight - parseInt(computed.getPropertyValue('padding-top'), 10) / 2
        } else if ([13].includes(e.keyCode)) {
            height = parseInt(computed.getPropertyValue('border-top-width'), 10)
                    + parseInt(computed.getPropertyValue('padding-top'), 10) / 2
                    + e.target.scrollHeight
                    + parseInt(computed.getPropertyValue('border-bottom-width'), 10)
        }
    
        e.target.style.height = `${height}px`
        parent.style.height = `${height}px`
        setNodeHeight(height)
    }

    return (
        <div className='bg-transparent rounded w-full h-full min-w-[100px] bg-blue-300' style={{ height: nodeHeight }} >
            <NodeResizer 
                minWidth={100}
                minHeight={nodeHeight}
                isVisible={selected}
                lineClassName="border-blue-400"
                handleClassName="h-3 w-3 bg-white border-2 rounded border-blue-400"
            />
            <textarea 
                tabIndex={-1} 
                spellCheck='false' 
                wrap="off" 
                autoCorrect="off" 
                aria-hidden='true' 
                className='bg-transparent w-full h-full min-w-[100px] resize-none overflow-hidden outline-none' 
                style={{ fontSize: 14, textAlign: "center", height: nodeHeight, paddingTop: '1em', paddingLeft: '1em', paddingRight: '1em', paddingBottom: '1em', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}
                onKeyDown={e => handleKeyDown(e)}
                placeholder="Digite algo aqui"
            >
                {data.text ? data.text : ''}
            </textarea>
            <Handle
                id='right' 
                type='source' 
                position={Position.Right} 
                className="-right-5 w-3 h-3 border-2 bg-blue-400/80"
            />
            <Handle 
                id='left' 
                type='source' 
                position={Position.Left} 
                className="-left-5 w-3 h-3 border-2 bg-blue-400/80"
            />
            <Handle 
                id='top' 
                type='source' 
                position={Position.Top}
                className="-top-5 w-3 h-3 border-2 bg-blue-400/80" 
            />
            <Handle 
                id='bottom' 
                type='source' 
                position={Position.Bottom}
                className="-bottom-5 w-3 h-3 border-2 bg-blue-400/80"
            />
        </div>
    )
}