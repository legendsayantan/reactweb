import Pc from "./Pc";
function FallingPcs({toFall = false,toSpread}){
    const angles = [0, 145, -25, -145, 55];
    const getStyle = (i,left,bottom=0) => {
        if(toFall){
            return {
                position: "absolute",
                bottom: `${bottom}px`,
                left: `${left}px`,
                justifyContent:"center",
                alignItems:"center",
                transform: `rotate(${angles[i]}deg) translate(0,0)`,
                transition: `all 0.75s linear ${i*0.25+(i>0?4:0)}s`,
            }
        }else if(toSpread){
            return {
                position: "absolute",
                bottom: `${bottom}px`,
                left: `${left}px`,
                justifyContent:"center",
                alignItems:"center",
                transform: `rotate(${angles[i]}deg) translateY(-150vh)`,
                transition: `all 1.5s linear`,
            }
        }
        return {
            position: "absolute",
            bottom: `${bottom}px`,
            left: `${left}px`,
            justifyContent:"center",
            alignItems:"center",
            transform: `translateY(-100vh)`,
        }
    }
    return(
        <div>
            <div style={getStyle(0,150)} >
                <Pc/>
            </div>
            <div style={{opacity:0.3}}>
                <div style={getStyle(1,60)} >
                    <Pc/>
                </div>
                <div style={getStyle(2,0)} className={`falling-pc ${toFall?'fall':'hidden'}`}>
                    <Pc/>
                </div>
                <div style={getStyle(3,50,50)} className={`falling-pc ${toFall?'fall':'hidden'}`}>
                    <Pc/>
                </div>
                <div style={getStyle(4,110,50)} className={`falling-pc ${toFall?'fall':'hidden'}`}>
                    <Pc/>
                </div>
            </div>
        </div>
    )
}export default FallingPcs