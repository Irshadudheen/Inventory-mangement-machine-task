import InventoryHeader from "../components/header"
import InventoryNavbar from "../components/navbar"


const dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen"> 
        {/* Header */}
         <InventoryHeader /> 
        
         <div className="flex flex-1"> 
          {/* Sidebar */}
           <InventoryNavbar /> 
          
          {/* Main Content */}
          <div className="flex-1 p-6"> 
             <main> 
              {/* Place your routed content here */}
            </main> 
          </div> 
         </div> 
      </div> 
  )
}

export default dashboard
