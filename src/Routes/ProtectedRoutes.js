import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

function ProtectedRoutes(props) {
    const {Component} = props;
    const navigate = useNavigate();
    const currentURL = window.location.pathname;
    const role = {
        admin: ["/generate-sheets","/progress-sheet"],
        teacher: ["/master-sheet","/section-sheet","/generate-results"]
    }
    useEffect(() => {
        let userRole = localStorage.getItem('role')
        if(!userRole){
            navigate('/');
        }
        else if(userRole === 'admin' && role[userRole].includes(currentURL)){
            navigate('/master-sheet')
        }
        else if(userRole === 'teacher' && role[userRole].includes(currentURL)){
            navigate('/generate-sheets')
        }
    })
  return (
    <div>
      <Component/>
    </div>
  )
}

export default ProtectedRoutes
