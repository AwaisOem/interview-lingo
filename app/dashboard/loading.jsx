'use client'
import {TailSpin} from "react-loader-spinner"

export default function Loading(){
    return (
        <div className="flex justify-center items-center h-screen">
            <TailSpin
                visible={true}
                height="80"
                width="80"
                color="#111827"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
  )

}