import { useEffect } from "react"

const CatLoad = ({ cat }) => {
  
    useEffect(() => {
        cat();}, []);
  
    return (
    <></>
  )
}

export default CatLoad