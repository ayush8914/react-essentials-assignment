import React , {useRef,useEffect} from 'react';
import Portal from '../Portal/Portal';
import './Modal.css';

const Modal = ({isOpen, onClose,title, children,showCloseButton=true}) => {
    /*
    - one ref to reference modal itself (for focusing when it opens)
    - one ref to remember last focused element before modal opened

    */

    const modalRef= useRef(null);
    const lastFocusRef = useRef(null);

    /*
    - store currenlty focused element when modal opens
    - focus the modal for keyboard navigation
    - prevent body scrolling
    - restore focus and scrolling when modal closes

     */

    useEffect(()=>{ 
        if(isOpen){ 
            lastFocusRef.current = document.activeElement;
            if(modalRef.current){
                modalRef.current.focus();
            }
            document.body.style.overflow = 'hidden'
        } 

        return () => {
            document.body.style.overflow = 'unset'
            if(lastFocusRef.current){
                lastFocusRef.current.focus();
            }
        }

    },[isOpen]);

    /*
    - handle keydown events for escape key
    - hanlde backdrop click (but not content clicks)
    - make sure event handling is clean and performant
    */

    const  handleKeyDown = (e) => {
        if(e.key === 'Escape'){
            onClose();
        }
    }

    const handleBackdropClick = (e) => {
        if(e.target === e.currentTarget){
            onClose();
        }
    }

    if(!isOpen)return null;

    return(
        <Portal>
            <div className='modal-backdrop' onClick={handleBackdropClick} onKeyDown={handleKeyDown}>
                <div ref={modalRef} className='modal-content' tabIndex={-1} role='dialog' aria-modal="true" aria-labelledby={title ? "modal-title" : undefined} >
                {
                    showCloseButton && (
                        <button className='modal-close-button' onClick={onClose} aria-label='close modal'>X</button>
                    )
                }

                {
                    title && (
                        <h2 id='modal-title' className='modal-title'>{title}</h2>
                    )
                }

                <div className='modal-body'>
                    {children}
                </div>

            </div>
            </div>
        </Portal>
    );
}



export default Modal