import {useRef, useEffect, useState} from 'react';
import { createPortal } from 'react-dom';


const Portal = ({children, portalId = 'portal-root'}) => {
    const portalRef = useRef(null);
    const [container, setContainer] = useState(null);
    /*
    - check if a portal container already exists
    - if not, create one and add it to the DOM
    - store the container reference
    - clean up when container unmounts
    */
    console.log("before useEffect");
    useEffect(()=>{
        console.log("in useEffect");
        let portalContainer = document.getElementById(portalId);
        if(portalContainer === null){
            portalContainer = document.createElement('div');
            portalContainer.id = portalId;
            document.body.appendChild(portalContainer);
        }

        portalRef.current = portalContainer;
        setContainer(portalContainer);

        return () => {
            if(portalContainer && portalContainer.children.length ===0){
                document.body.removeChild(portalContainer);
            }
        };
    },[portalId]);
    
    console.log("after useEffect");
    if(!container)return null;
    
    console.log("before return");
    return createPortal(children, container);

}

export default Portal;
