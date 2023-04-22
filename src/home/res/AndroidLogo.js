function AndroidLogo({show = true}){
    return(
        <div style={{
            position: "absolute",
            bottom: 0,
            height: "100px",
            width: "100px",
        }}>{show &&
            <img style={{
                position: "absolute",
                bottom: 0,
                filter: "invert(1)",
            }} src={'https://res.cloudinary.com/da0cp0s8l/image/upload/v1682170013/android-anim_dedq2v.svg'} alt={''}/>
        }</div>
    )
}
export default AndroidLogo