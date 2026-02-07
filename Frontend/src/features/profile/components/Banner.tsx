export default function Banner({image}: {image: React.ReactNode}){
    return(
        <div className="w-full h-80 bg-[#444444] bg-center bg-cover relative" style={{backgroundImage: `url(${image})`}}>

        </div>
    )
}