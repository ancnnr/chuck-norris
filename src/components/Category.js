import { Dropdown } from "react-bootstrap"

const Category = ({cat}) => {
  
    return (
    <>
        {cat.map((category) => (
            <Dropdown.Item href="#/action-1">{category}</Dropdown.Item>
        )
        )}
    </>
  )
}

export default Category