export default function Avatar({image}: {image: React.ReactNode}){
    return(
        <div className="aspect-square h-25 bg-[#444444] bg-center bg-cover relative" style={{backgroundImage: `url(${image})`}}>

        </div>
    )
}